'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle, Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function WalletConfigPage() {
  const [config, setConfig] = useState({
    walletAddress: '',
    hasPrivateKey: false,
    piNetwork: '',
    isValid: false,
    lastChecked: '',
  })
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    checkWalletConfig()
  }, [])

  const checkWalletConfig = async () => {
    try {
      const res = await fetch('/api/wallet/config')
      const data = await res.json()
      setConfig(data)
    } catch (err) {
      console.error('Failed to check wallet config:', err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wallet configuration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-green-600 hover:text-green-700 mb-4 inline-flex items-center gap-1">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet Configuration</h1>
          <p className="text-gray-600">Verify your app wallet settings</p>
        </div>

        {/* Configuration Status */}
        <div className={`bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 ${config.isValid ? 'border-green-500' : 'border-yellow-500'}`}>
          <div className="flex items-start gap-4">
            {config.isValid ? (
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            ) : (
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {config.isValid ? 'Wallet Configured' : 'Configuration Incomplete'}
              </h2>
              <p className="text-gray-600">
                {config.isValid
                  ? 'Your app wallet is properly configured and ready to receive payments.'
                  : 'Your wallet needs additional configuration to receive payments.'}
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration Details</h3>

          <div className="space-y-4">
            {/* Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Address</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-gray-100 p-3 rounded text-sm font-mono text-gray-900 break-all">
                  {config.walletAddress || 'Not configured'}
                </code>
                {config.walletAddress && (
                  <button
                    onClick={() => copyToClipboard(config.walletAddress)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                )}
              </div>
              {copied && <p className="text-sm text-green-600 mt-1">Copied to clipboard!</p>}
            </div>

            {/* Private Key Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Private Key</label>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-2 rounded text-sm font-medium ${config.hasPrivateKey ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {config.hasPrivateKey ? '✓ Configured' : '⚠ Not configured'}
                </div>
                <p className="text-sm text-gray-600">
                  {config.hasPrivateKey
                    ? 'Private key is securely stored'
                    : 'Add PI_APP_WALLET_PRIVATE_KEY to environment'}
                </p>
              </div>
            </div>

            {/* Pi Network */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pi Network</label>
              <div className="px-3 py-2 rounded bg-blue-50 text-blue-900 text-sm font-medium">
                {config.piNetwork || 'testnet'}
              </div>
            </div>

            {/* Last Checked */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Verified</label>
              <p className="text-sm text-gray-600">{config.lastChecked || 'Just now'}</p>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Setup Instructions</h3>
          <ol className="space-y-3 text-blue-900 text-sm">
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">1.</span>
              <span>In Vercel project settings, add environment variables:
                <code className="block bg-white p-2 rounded mt-1 font-mono text-xs">NEXT_PUBLIC_APP_WALLET_ADDRESS=GAGNZW6...TWA2M</code>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">2.</span>
              <span>Add the private key (securely):
                <code className="block bg-white p-2 rounded mt-1 font-mono text-xs">PI_APP_WALLET_PRIVATE_KEY=SAGVBYLF7L...</code>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">3.</span>
              <span>Redeploy your application</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold flex-shrink-0">4.</span>
              <span>Refresh this page to verify configuration</span>
            </li>
          </ol>
        </div>

        {/* Database Setup */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Database Setup</h3>
          <p className="text-purple-900 text-sm mb-4">
            Run the wallet setup SQL script in your Supabase database:
          </p>
          <Link
            href="/api/wallet/setup-sql"
            target="_blank"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium"
          >
            View Setup Script
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
