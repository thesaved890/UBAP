"use server"

import { createSupabaseClient } from "./supabase-service"

interface User {
  id: string
  pi_uid: string
  username: string
  email?: string
  phone_number?: string
  country: string
  balance_pi: number
  balance_fiat: number
  fiat_currency: string
  created_at: string
  last_login: string
}

// Get or create user
export async function getOrCreateUser(piUid: string, username: string, country: string = "Nigeria") {
  const supabase = createSupabaseClient()
  
  // Try to find existing user
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('pi_uid', piUid)
    .single()

  if (existingUser) {
    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', existingUser.id)
    
    return existingUser
  }

  // Create new user
  const newUser = {
    pi_uid: piUid,
    username,
    country,
    balance_pi: 0,
    balance_fiat: 0,
    fiat_currency: getCurrencyForCountry(country),
  }

  const { data: createdUser, error: createError } = await supabase
    .from('users')
    .insert(newUser)
    .select()
    .single()

  if (createError) {
    console.error('[v0] Error creating user:', createError)
    throw new Error('Failed to create user')
  }

  return createdUser
}

// Update user balance
export async function updateUserBalance(userId: string, balancePi?: number, balanceFiat?: number) {
  const supabase = createSupabaseClient()
  
  const updates: any = {}
  if (balancePi !== undefined) updates.balance_pi = balancePi
  if (balanceFiat !== undefined) updates.balance_fiat = balanceFiat

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)

  if (error) {
    console.error('[v0] Error updating balance:', error)
    throw new Error('Failed to update balance')
  }

  return true
}

// Get user by ID
export async function getUserById(userId: string) {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('[v0] Error fetching user:', error)
    return null
  }

  return data
}

// Helper function to get currency for country
function getCurrencyForCountry(country: string): string {
  const currencyMap: Record<string, string> = {
    Nigeria: "NGN",
    "South Africa": "ZAR",
    Kenya: "KES",
    Ghana: "GHS",
    Egypt: "EGP",
    Morocco: "MAD",
    Tanzania: "TZS",
    Uganda: "UGX",
    Ethiopia: "ETB",
    Angola: "AOA",
  }
  return currencyMap[country] || "USD"
}

// Export UserService object for easier imports
export const UserService = {
  getOrCreateUser,
  updateUserBalance,
  getUserById,
  createUser: async (userData: any) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
    if (error) throw error
    return data
  },
  updateBalance: updateUserBalance,
}
