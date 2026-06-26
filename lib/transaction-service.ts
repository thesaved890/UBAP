"use server"

import { createSupabaseClient } from "./supabase-service"

export interface Transaction {
  id: string
  user_id: string
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment' | 'exchange' | 'bill_payment'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  description?: string
  metadata?: any
  created_at: string
}

// Create transaction
export async function createTransaction(
  userId: string,
  type: Transaction['type'],
  amount: number,
  currency: string,
  description?: string,
  metadata?: any
) {
  const supabase = createSupabaseClient()
  
  const transaction = {
    user_id: userId,
    type,
    amount,
    currency,
    status: 'pending' as const,
    description,
    metadata,
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .select()
    .single()

  if (error) {
    console.error('[v0] Error creating transaction:', error)
    throw new Error('Failed to create transaction')
  }

  return data
}

// Update transaction status
export async function updateTransactionStatus(
  transactionId: string,
  status: Transaction['status']
) {
  const supabase = createSupabaseClient()
  
  const { error } = await supabase
    .from('transactions')
    .update({ status })
    .eq('id', transactionId)

  if (error) {
    console.error('[v0] Error updating transaction:', error)
    throw new Error('Failed to update transaction')
  }

  return true
}

// Get user transactions
export async function getUserTransactions(userId: string, limit = 50) {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[v0] Error fetching transactions:', error)
    return []
  }

  return data || []
}

// Get transaction by ID
export async function getTransactionById(transactionId: string) {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', transactionId)
    .single()

  if (error) {
    console.error('[v0] Error fetching transaction:', error)
    return null
  }

  return data
}
