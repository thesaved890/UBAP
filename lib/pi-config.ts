/**
 * Pi Network Global Configuration
 * Based on GCV (Global Consensus Value)
 */

// Pi Network GCV Rate: 1 Pi = $314,159 USD
export const PI_GCV_RATE = 314159

/**
 * Pi Configuration Object
 */
export const PI_CONFIG = {
  GCV_RATE: PI_GCV_RATE,
  TRANSACTION_FEE_PERCENTAGE: 0.001, // 0.1%
}

/**
 * Convert USD to Pi
 * @param usdAmount - Amount in USD
 * @returns Equivalent amount in Pi
 */
export function usdToPi(usdAmount: number): number {
  return usdAmount / PI_GCV_RATE
}

/**
 * Convert Pi to USD
 * @param piAmount - Amount in Pi
 * @returns Equivalent amount in USD
 */
export function piToUsd(piAmount: number): number {
  return piAmount * PI_GCV_RATE
}

/**
 * Format Pi amount with symbol
 * @param amount - Pi amount
 * @param decimals - Number of decimal places (default: 4)
 * @returns Formatted Pi string
 */
export function formatPi(amount: number, decimals = 4): string {
  return `π ${amount.toFixed(decimals)}`
}

/**
 * Format USD amount with symbol
 * @param amount - USD amount
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted USD string
 */
export function formatUsd(amount: number, decimals = 2): string {
  return `$${amount.toLocaleString(undefined, { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  })}`
}

/**
 * Calculate transaction fee (0.1% of amount)
 * @param amount - Transaction amount in Pi
 * @returns Fee in Pi
 */
export function calculateTransactionFee(amount: number): number {
  return amount * 0.001
}

/**
 * Get net amount after fee
 * @param amount - Gross amount in Pi
 * @returns Net amount after deducting fee
 */
export function getNetAmount(amount: number): number {
  return amount - calculateTransactionFee(amount)
}
