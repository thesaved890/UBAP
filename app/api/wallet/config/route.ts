import { NextResponse } from 'next/server'
import { isValidPiAddress } from '@/lib/app-wallet-service'

export async function GET() {
  try {
    const walletAddress =
      process.env.NEXT_PUBLIC_UBAP_WALLET_ADDRESS ||
      process.env.NEXT_PUBLIC_APP_WALLET_ADDRESS ||
      ''
    const hasPrivateKey = !!process.env.PI_APP_WALLET_PRIVATE_KEY
    const piNetwork = process.env.PI_NETWORK || 'testnet'

    // Validate wallet address format
    const isValid = Boolean(
      walletAddress && isValidPiAddress(walletAddress) && hasPrivateKey
    )

    return NextResponse.json({
      walletAddress,
      hasPrivateKey,
      piNetwork,
      isValid,
      lastChecked: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error checking wallet config:', error)
    return NextResponse.json(
      { error: 'Failed to check wallet configuration' },
      { status: 500 }
    )
  }
}
