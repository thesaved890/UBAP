/**
 * UBAP Wallet Configuration
 * 
 * This file contains the UBAP app wallet configuration for receiving Pi deposits.
 * The wallet address is derived from the Pi Developer Portal when you set up the App Wallet.
 * 
 * STATUS: Configured with production wallet address
 */

export const UBAP_WALLET_CONFIG = {
  /**
   * UBAP App Wallet Address
   * Get this from: https://develop.pi → UBAP App → App Wallet → Setup Wallet
   * This is the address that receives all Pi deposits from pioneers
   * 
   * Current Wallet: GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M
   */
  appWalletAddress: process.env.NEXT_PUBLIC_UBAP_WALLET_ADDRESS || "GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M",

  /**
   * Wallet recipient for server-side payment approvals
   * When user sends Pi to UBAP, this is where it flows
   */
  recipientAddress: process.env.NEXT_PUBLIC_UBAP_RECIPIENT || "GAGNZW6KQW7CXIFBR7RC4NHU6QZMD62CRJTAX24P4IXSLJZLZ22TWA2M",

  /**
   * Transaction fee percentage (0.1% of deposit)
   */
  transactionFeePercent: 0.001,

  /**
   * Minimum deposit amount (in Pi)
   */
  minDepositAmount: 1,

  /**
   * Maximum deposit amount per transaction (in Pi)
   */
  maxDepositAmount: 1000000,

  /**
   * Check if wallet is properly configured
   */
  isConfigured: (): boolean => {
    return (
      !!process.env.NEXT_PUBLIC_UBAP_WALLET_ADDRESS &&
      process.env.NEXT_PUBLIC_UBAP_WALLET_ADDRESS !== "ubap_default_wallet"
    );
  },

  /**
   * Get wallet info for UI display
   */
  getWalletInfo: () => ({
    address: UBAP_WALLET_CONFIG.appWalletAddress,
    configured: UBAP_WALLET_CONFIG.isConfigured(),
    minDeposit: UBAP_WALLET_CONFIG.minDepositAmount,
    maxDeposit: UBAP_WALLET_CONFIG.maxDepositAmount,
    fee: UBAP_WALLET_CONFIG.transactionFeePercent * 100 + "%",
  }),
};

/**
 * Helper to calculate deposit breakdown
 */
export function calculateDepositBreakdown(amount: number) {
  const fee = amount * UBAP_WALLET_CONFIG.transactionFeePercent;
  const netDeposit = amount - fee;

  return {
    grossAmount: amount,
    fee,
    netDeposit,
    feePercent: UBAP_WALLET_CONFIG.transactionFeePercent * 100,
  };
}

/**
 * Validate deposit amount
 */
export function validateDepositAmount(amount: number): { valid: boolean; error?: string } {
  if (amount < UBAP_WALLET_CONFIG.minDepositAmount) {
    return {
      valid: false,
      error: `Minimum deposit is ${UBAP_WALLET_CONFIG.minDepositAmount} π`,
    };
  }

  if (amount > UBAP_WALLET_CONFIG.maxDepositAmount) {
    return {
      valid: false,
      error: `Maximum deposit is ${UBAP_WALLET_CONFIG.maxDepositAmount} π`,
    };
  }

  return { valid: true };
}
