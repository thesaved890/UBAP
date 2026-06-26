"use client"

/**
 * UBAP Pi Balance Store
 * Manages the user's Pi balance and transaction history in localStorage.
 * In production, this should sync with a real database.
 */

export interface PiTransaction {
  id: string;
  type: "deposit" | "withdrawal" | "tontine" | "group_savings" | "transfer";
  amount: number;
  fee: number;
  netAmount: number;
  memo: string;
  txid: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  isSandbox?: boolean;
}

const BALANCE_KEY     = "ubap_pi_balance";
const HISTORY_KEY     = "ubap_pi_transactions";
const MAX_HISTORY     = 100;

export const PiBalanceStore = {
  // ── Balance ───────────────────────────────────────────────────────────────
  getBalance(): number {
    if (typeof window === "undefined") return 0;
    return parseFloat(localStorage.getItem(BALANCE_KEY) ?? "0") || 0;
  },

  setBalance(amount: number): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(BALANCE_KEY, Math.max(0, amount).toFixed(6));
  },

  addBalance(amount: number): number {
    const newBalance = this.getBalance() + amount;
    this.setBalance(newBalance);
    return newBalance;
  },

  subtractBalance(amount: number): number {
    const newBalance = Math.max(0, this.getBalance() - amount);
    this.setBalance(newBalance);
    return newBalance;
  },

  // Keep legacy method names for compatibility
  addDeposit(amount: number): number {
    return this.addBalance(amount);
  },

  subtractAmount(amount: number): number {
    return this.subtractBalance(amount);
  },

  // ── Transaction history ───────────────────────────────────────────────────
  getTransactionHistory(): PiTransaction[] {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    } catch {
      return [];
    }
  },

  addTransaction(tx: Omit<PiTransaction, "id" | "timestamp">): PiTransaction {
    const full: PiTransaction = {
      ...tx,
      id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
    };
    const history = this.getTransactionHistory();
    history.unshift(full);
    if (typeof window !== "undefined") {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
    }
    return full;
  },

  // ── Deposit helper (add balance + record tx in one call) ──────────────────
  recordDeposit(params: {
    amount: number;
    fee: number;
    txid: string;
    memo: string;
    isSandbox?: boolean;
  }): { newBalance: number; tx: PiTransaction } {
    const net = +(params.amount - params.fee).toFixed(6);
    const newBalance = this.addBalance(net);
    const tx = this.addTransaction({
      type: "deposit",
      amount: params.amount,
      fee: params.fee,
      netAmount: net,
      memo: params.memo,
      txid: params.txid,
      status: "completed",
      isSandbox: params.isSandbox ?? false,
    });
    return { newBalance, tx };
  },
};
