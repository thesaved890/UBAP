'use server'

import { UBAP_WALLET_CONFIG, calculateDepositBreakdown } from './ubap-wallet-config'
import { PiServerSDK } from './pi-network-sdk'

export interface DepositRequest {
  userId: string
  username: string
  amount: number
  memo?: string
  metadata?: Record<string, any>
}

export interface DepositResponse {
  success: boolean
  paymentId?: string
  amount?: number
  fee?: number
  netDeposit?: number
  status?: 'pending' | 'approved' | 'completed' | 'failed'
  error?: string
  message?: string
}

/**
 * Initiate a Pi deposit from user's wallet to UBAP
 */
export async function initiatePiDeposit(request: DepositRequest): Promise<DepositResponse> {
  try {
    if (request.amount <= 0) {
      return {
        success: false,
        error: 'Amount must be greater than 0',
      }
    }

    const breakdown = calculateDepositBreakdown(request.amount)

    const memo = request.memo || `UBAP Deposit - ${request.username}`
    const metadata = {
      userId: request.userId,
      username: request.username,
      recipientWallet: UBAP_WALLET_CONFIG.recipientAddress,
      depositType: 'user_deposit',
      timestamp: new Date().toISOString(),
      ...(request.metadata || {}),
    }

    return {
      success: true,
      amount: request.amount,
      fee: breakdown.fee,
      netDeposit: breakdown.netDeposit,
      message: 'Deposit initiated. Pi Wallet opening...',
      status: 'pending',
    }
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Failed to initiate deposit',
    }
  }
}

/**
 * Process a completed Pi deposit (called after blockchain confirmation)
 */
export async function processPiDeposit(
  paymentId: string,
  userId: string,
  amount: number,
  txid: string
): Promise<DepositResponse> {
  try {
    const sdk = new PiServerSDK()

    if (sdk.isConfigured) {
      try {
        await sdk.approvePayment(paymentId)
      } catch (err: any) {
        console.error('[UBAP] Failed to approve payment:', err)
        return {
          success: false,
          error: 'Payment approval failed. Please contact support.',
          status: 'failed',
        }
      }
    }

    if (sdk.isConfigured && txid) {
      try {
        await sdk.completePayment(paymentId, txid)
      } catch (err: any) {
        console.error('[UBAP] Failed to complete payment:', err)
        return {
          success: false,
          error: 'Payment completion failed. Please contact support.',
          status: 'failed',
        }
      }
    }

    const breakdown = calculateDepositBreakdown(amount)
    const depositRecord = {
      paymentId,
      userId,
      amount: breakdown.grossAmount,
      fee: breakdown.fee,
      netDeposit: breakdown.netDeposit,
      txid,
      walletAddress: UBAP_WALLET_CONFIG.appWalletAddress,
      status: 'completed',
      timestamp: new Date().toISOString(),
    }

    try {
      const deposits = JSON.parse(localStorage.getItem('ubap_deposits') || '[]')
      deposits.push(depositRecord)
      localStorage.setItem('ubap_deposits', JSON.stringify(deposits))
    } catch {
      // Non-blocking
    }

    return {
      success: true,
      paymentId,
      amount: breakdown.grossAmount,
      fee: breakdown.fee,
      netDeposit: breakdown.netDeposit,
      status: 'completed',
      message: `Successfully deposited ${breakdown.netDeposit.toFixed(2)} π to your UBAP account`,
    }
  } catch (error: any) {
    console.error('[UBAP] Error processing deposit:', error)
    return {
      success: false,
      error: error?.message || 'Failed to process deposit',
      status: 'failed',
    }
  }
}

/**
 * Get deposit history for a user
 */
export function getDepositHistory(userId: string): any[] {
  try {
    const allDeposits = JSON.parse(localStorage.getItem('ubap_deposits') || '[]')
    return allDeposits.filter((d: any) => d.userId === userId)
  } catch {
    return []
  }
}

/**
 * Get UBAP wallet address for user display
 */
export function getUbapWalletAddress(): string {
  return UBAP_WALLET_CONFIG.appWalletAddress
}

/**
 * Check if wallet is ready for deposits
 */
export function isWalletReady(): boolean {
  return UBAP_WALLET_CONFIG.isConfigured()
}
