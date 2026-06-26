"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Download, TrendingUp, TrendingDown, Clock } from "lucide-react"
import { getAppWalletWithBalance, getAppWalletTransactions } from "@/lib/app-wallet-service"
import { LoadingSpinner } from "@/components/loading-spinner"

interface Wallet {
  id: string
  wallet_address: string
  wallet_type: string
  network: string
  total_received_pi: number
  total_withdrawn_pi: number
  current_balance_pi: number
  created_at: string
  updated_at: string
  transaction_count?: number
  recent_transactions?: any[]
}

interface Transaction {
  id: string
  app_wallet_id: string
  transaction_type: "incoming" | "outgoing" | "internal_transfer"
  from_address: string | null
  to_address: string | null
  amount_pi: number
  currency: string
  status: string
  txid: string | null
  payment_id: string | null
  user_id: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export default function AdminWalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    loadWalletData()
  }, [])

  const loadWalletData = async () => {
    setLoading(true)
    try {
      const walletData = await getAppWalletWithBalance()
      setWallet(walletData)

      if (walletData?.id) {
        const txData = await getAppWalletTransactions(50, 0)
        setTransactions(txData)
      }
    } catch (error) {
      console.error("Failed to load wallet:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyAddress = async () => {
    if (wallet?.wallet_address) {
      await navigator.clipboard.writeText(wallet.wallet_address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadReport = () => {
    if (!wallet) return

    const report = {
      timestamp: new Date().toISOString(),
      wallet: wallet,
      transactions: transactions,
      summary: {
        total_received: wallet.total_received_pi,
        total_withdrawn: wallet.total_withdrawn_pi,
        current_balance: wallet.current_balance_pi,
        transaction_count: wallet.transaction_count,
      }
    }

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2)))
    element.setAttribute("download", `ubap-wallet-report-${Date.now()}.json`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  if (!wallet) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/admin-secret/dashboard" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back to Admin
          </Link>
          <div className="bg-slate-800 rounded-lg p-8 text-center">
            <p className="text-slate-300">App wallet not initialized</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin-secret/dashboard" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-white">UBAP App Wallet</h1>
          <p className="text-slate-400 mt-2">Manage incoming Pi payments and wallet balance</p>
        </div>

        {/* Wallet Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Current Balance */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-400 text-sm">Current Balance</span>
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">π {wallet.current_balance_pi.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-2">Available for operations</p>
          </div>

          {/* Total Received */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-400 text-sm">Total Received</span>
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">π {wallet.total_received_pi.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-2">All-time received</p>
          </div>

          {/* Total Withdrawn */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-400 text-sm">Total Withdrawn</span>
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">π {wallet.total_withdrawn_pi.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-2">All-time withdrawn</p>
          </div>

          {/* Transaction Count */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-2">
              <span className="text-slate-400 text-sm">Transactions</span>
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{wallet.transaction_count || 0}</p>
            <p className="text-xs text-slate-500 mt-2">All-time transactions</p>
          </div>
        </div>

        {/* Wallet Address Section */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Wallet Address</h2>
          <div className="flex items-center gap-2 bg-slate-700/50 rounded p-4">
            <code className="flex-1 text-sm text-slate-300 break-all">{wallet.wallet_address}</code>
            <button
              onClick={copyAddress}
              className="flex-shrink-0 p-2 text-slate-400 hover:text-white transition"
              title="Copy address"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          {copied && <p className="text-xs text-emerald-400 mt-2">Copied to clipboard!</p>}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Network</p>
              <p className="text-sm font-medium text-white capitalize">{wallet.network.replace("_", " ")}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Created</p>
              <p className="text-sm font-medium text-white">{new Date(wallet.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
          <button
            onClick={loadWalletData}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition"
          >
            Refresh Data
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-700/30 transition">
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          tx.transaction_type === 'incoming'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {tx.transaction_type.charAt(0).toUpperCase() + tx.transaction_type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white font-medium">π {tx.amount_pi.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : tx.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                        {tx.txid ? `${tx.txid.substring(0, 8)}...` : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                      No transactions yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
