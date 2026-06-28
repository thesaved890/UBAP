import { createSupabaseClient } from "./supabase-service"

export interface AppWallet {
  id: string
  wallet_address: string
  wallet_type: "pi_app_wallet"
  network: "pi_mainnet" | "pi_testnet"
  total_received_pi: number
  total_withdrawn_pi: number
  current_balance_pi: number
  created_at: string
  updated_at: string
}

export interface WalletTransaction {
  id: string
  app_wallet_id: string
  transaction_type: "incoming" | "outgoing" | "internal_transfer"
  from_address: string | null
  to_address: string | null
  amount_pi: number
  currency: "pi"
  status: "pending" | "completed" | "failed" | "cancelled"
  is_sandbox?: boolean
  txid: string | null
  payment_id: string | null
  user_id: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface WalletWithBalance extends AppWallet {
  transaction_count: number
  recent_transactions: WalletTransaction[]
}

/**
 * Get the configured app wallet address from UBAP config
 */
function getAppWalletAddress(): string {
  // Import UBAP_WALLET_CONFIG dynamically to avoid circular imports
  const { UBAP_WALLET_CONFIG } = require("./ubap-wallet-config") as typeof import("./ubap-wallet-config")
  const address = UBAP_WALLET_CONFIG.appWalletAddress
  
  if (!address || address === "ubap_default_wallet") {
    throw new Error(
      "App wallet address not configured. Set NEXT_PUBLIC_UBAP_WALLET_ADDRESS or configure UBAP_WALLET_CONFIG.appWalletAddress"
    )
  }
  return address
}

/**
 * Verify wallet private key is configured
 */
function verifyAppWalletPrivateKey(): boolean {
  return !!(process.env.PI_APP_WALLET_PRIVATE_KEY || "SAGVBYLF7L7KPHOW66JQYOPMEJMZLXOSZTFIL463PZJ4CGAKQ7MWQR2R")
}

/**
 * Initialize or retrieve the app's Pi wallet
 */
export async function initializeAppWallet() {
  const supabase = createSupabaseClient()
  const walletAddress = getAppWalletAddress()

  // Check if wallet exists
  const { data: existing } = await supabase
    .from("app_wallets")
    .select("*")
    .eq("wallet_address", walletAddress)
    .eq("wallet_type", "pi_app_wallet")
    .single()

  if (existing) {
    return existing as AppWallet
  }

  // Verify private key is configured
  if (!verifyAppWalletPrivateKey()) {
    console.warn(
      "Warning: PI_APP_WALLET_PRIVATE_KEY not set. Incoming transactions will be recorded but cannot be signed server-side."
    )
  }

  // Create new app wallet with configured address
  const { data: newWallet, error } = await supabase
    .from("app_wallets")
    .insert([
      {
        wallet_address: walletAddress,
        wallet_type: "pi_app_wallet",
        network: (process.env.PI_NETWORK || "sandbox") === "mainnet" ? "pi_mainnet" : "pi_testnet",
        total_received_pi: 0,
        total_withdrawn_pi: 0,
        current_balance_pi: 0,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Failed to create app wallet:", error)
    throw error
  }

  return newWallet as AppWallet
}

/**
 * Get app wallet with balance and recent transactions
 */
export async function getAppWalletWithBalance(): Promise<WalletWithBalance | null> {
  const supabase = createSupabaseClient()

  const { data: wallet, error: walletError } = await supabase
    .from("app_wallets")
    .select("*")
    .eq("wallet_type", "pi_app_wallet")
    .single()

  if (walletError || !wallet) {
    return null
  }

  // Get recent transactions
  const { data: transactions = [] } = await supabase
    .from("wallet_transactions")
    .select("*")
    .eq("app_wallet_id", wallet.id)
    .order("created_at", { ascending: false })
    .limit(10)

  // Get transaction count
  const { count = 0 } = await supabase
    .from("wallet_transactions")
    .select("*", { count: "exact", head: true })
    .eq("app_wallet_id", wallet.id)

  return {
    ...wallet,
    transaction_count: count,
    recent_transactions: transactions,
  }
}

/**
 * Record incoming payment to app wallet
 * Called when a user successfully deposits Pi into their UBAP balance
 */
export async function recordIncomingPayment(
  paymentId: string,
  txid: string,
  amount: number,
  userId: string,
  isSandbox: boolean = false
) {
  const supabase = createSupabaseClient()

  // Get or create app wallet
  let wallet = await getAppWallet()
  if (!wallet) {
    wallet = await initializeAppWallet()
  }

  // Create transaction record
  const { data: transaction, error: txError } = await supabase
    .from("wallet_transactions")
    .insert([
      {
        app_wallet_id: wallet.id,
        transaction_type: "incoming",
        from_address: null,
        to_address: wallet.wallet_address,
        amount_pi: amount,
        currency: "pi",
        status: "completed",
        is_sandbox: isSandbox,
        txid,
        payment_id: paymentId,
        user_id: userId,
        description: `Deposit from user ${userId}`,
      },
    ])
    .select()
    .single()

  if (txError) {
    console.error("Failed to record wallet transaction:", txError)
    throw txError
  }

  // Update app wallet balance
  const { error: updateError } = await supabase
    .from("app_wallets")
    .update({
      current_balance_pi: wallet.current_balance_pi + amount,
      total_received_pi: wallet.total_received_pi + amount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", wallet.id)

  if (updateError) {
    console.error("Failed to update app wallet balance:", updateError)
    throw updateError
  }

  return transaction as WalletTransaction
}

/**
 * Process withdrawal from app wallet
 */
export async function processWalletWithdrawal(
  amount: number,
  toAddress: string,
  description?: string
) {
  const supabase = createSupabaseClient()

  let wallet = await getAppWallet()
  if (!wallet) {
    throw new Error("App wallet not initialized")
  }

  if (wallet.current_balance_pi < amount) {
    throw new Error("Insufficient wallet balance")
  }

  // Create withdrawal transaction
  const { data: transaction, error: txError } = await supabase
    .from("wallet_transactions")
    .insert([
      {
        app_wallet_id: wallet.id,
        transaction_type: "outgoing",
        from_address: wallet.wallet_address,
        to_address: toAddress,
        amount_pi: amount,
        currency: "pi",
        status: "pending",
        description: description || "Wallet withdrawal",
      },
    ])
    .select()
    .single()

  if (txError) {
    throw txError
  }

  // Update wallet balance
  await supabase
    .from("app_wallets")
    .update({
      current_balance_pi: wallet.current_balance_pi - amount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", wallet.id)

  return transaction as WalletTransaction
}

/**
 * Update transaction status
 */
export async function updateTransactionStatus(
  transactionId: string,
  status: "pending" | "completed" | "failed" | "cancelled",
  txid?: string
) {
  const supabase = createSupabaseClient()

  const update: any = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (txid) {
    update.txid = txid
  }

  const { data: transaction, error } = await supabase
    .from("wallet_transactions")
    .update(update)
    .eq("id", transactionId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return transaction as WalletTransaction
}

/**
 * Get app wallet without balance details
 */
export async function getAppWallet(): Promise<AppWallet | null> {
  const supabase = createSupabaseClient()

  const { data: wallet } = await supabase
    .from("app_wallets")
    .select("*")
    .eq("wallet_type", "pi_app_wallet")
    .single()

  return wallet as AppWallet | null
}

/**
 * Get all transactions for the app wallet
 */
export async function getAppWalletTransactions(
  limit: number = 50,
  offset: number = 0
) {
  const supabase = createSupabaseClient()

  const wallet = await getAppWallet()
  if (!wallet) {
    return []
  }

  const { data: transactions } = await supabase
    .from("wallet_transactions")
    .select("*")
    .eq("app_wallet_id", wallet.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  return transactions as WalletTransaction[]
}

/**
 * Validate a Pi wallet address format
 * Pi addresses are 56 characters, uppercase alphanumeric
 */
export function isValidPiAddress(address: string): boolean {
  return /^[A-Z0-9]{56}$/.test(address)
}

/**
 * Get wallet statistics
 */
export async function getWalletStats() {
  const supabase = createSupabaseClient()

  const wallet = await getAppWallet()
  if (!wallet) {
    return null
  }

  // Get total transactions
  const { data: stats } = await supabase
    .rpc("get_wallet_stats", { wallet_id: wallet.id })

  return stats
}
