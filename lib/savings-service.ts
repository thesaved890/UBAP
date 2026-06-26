"use server"

import { createSupabaseClient } from "./supabase-service"

export interface SavingsGoal {
  id: string
  user_id: string
  title: string
  target_amount: number
  current_amount: number
  currency: string
  deadline?: string
  category?: string
  is_locked: boolean
  unlock_date?: string
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
}

// Create savings goal
export async function createSavingsGoal(
  userId: string,
  title: string,
  targetAmount: number,
  currency: string,
  deadline?: string,
  category?: string,
  isLocked = false,
  unlockDate?: string
) {
  const supabase = createSupabaseClient()
  
  const goal = {
    user_id: userId,
    title,
    target_amount: targetAmount,
    current_amount: 0,
    currency,
    deadline,
    category,
    is_locked: isLocked,
    unlock_date: unlockDate,
    status: 'active' as const,
  }

  const { data, error } = await supabase
    .from('savings_goals')
    .insert(goal)
    .select()
    .single()

  if (error) {
    console.error('[v0] Error creating savings goal:', error)
    throw new Error('Failed to create savings goal')
  }

  return data
}

// Add money to savings goal
export async function addToSavingsGoal(goalId: string, amount: number) {
  const supabase = createSupabaseClient()
  
  // Get current amount
  const { data: goal, error: fetchError } = await supabase
    .from('savings_goals')
    .select('current_amount, target_amount')
    .eq('id', goalId)
    .single()

  if (fetchError || !goal) {
    throw new Error('Savings goal not found')
  }

  const newAmount = goal.current_amount + amount
  const status = newAmount >= goal.target_amount ? 'completed' : 'active'

  const { error } = await supabase
    .from('savings_goals')
    .update({ 
      current_amount: newAmount,
      status 
    })
    .eq('id', goalId)

  if (error) {
    console.error('[v0] Error updating savings goal:', error)
    throw new Error('Failed to update savings goal')
  }

  return true
}

// Get user savings goals
export async function getUserSavingsGoals(userId: string) {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('savings_goals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching savings goals:', error)
    return []
  }

  return data || []
}

// Delete savings goal
export async function deleteSavingsGoal(goalId: string) {
  const supabase = createSupabaseClient()
  
  const { error } = await supabase
    .from('savings_goals')
    .delete()
    .eq('id', goalId)

  if (error) {
    console.error('[v0] Error deleting savings goal:', error)
    throw new Error('Failed to delete savings goal')
  }

  return true
}
