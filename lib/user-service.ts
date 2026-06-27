"use server"

import { createSupabaseClient, isSupabaseConfigured } from "./supabase-service"

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

function buildLocalUser(piUid: string, username: string, country: string = "Nigeria") {
  return {
    id: `local-${piUid}`,
    pi_uid: piUid,
    username,
    country,
    balance_pi: 0,
    balance_fiat: 0,
    fiat_currency: getCurrencyForCountry(country),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    source: "local",
  }
}

// Get or create user
export async function getOrCreateUser(piUid: string, username: string, country: string = "Nigeria") {
  if (!isSupabaseConfigured) {
    return buildLocalUser(piUid, username, country)
  }

  const supabase = createSupabaseClient()

  try {
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('pi_uid', piUid)
      .maybeSingle()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.warn('[v0] Falling back to local user profile:', fetchError)
      return buildLocalUser(piUid, username, country)
    }

    if (existingUser) {
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', existingUser.id)

      return existingUser
    }

    const newUser = {
      pi_uid: piUid,
      username,
      country,
      balance_pi: 0,
      balance_fiat: 0,
      fiat_currency: getCurrencyForCountry(country),
      last_login: new Date().toISOString(),
    }

    const { data: createdUser, error: createError } = await supabase
      .from('users')
      .insert(newUser)
      .select()
      .single()

    if (createError) {
      console.warn('[v0] Falling back to local user profile:', createError)
      return buildLocalUser(piUid, username, country)
    }

    return createdUser
  } catch (error) {
    console.warn('[v0] Supabase unavailable, using local user profile:', error)
    return buildLocalUser(piUid, username, country)
  }
}

// Update user balance
export async function updateUserBalance(userId: string, balancePi?: number, balanceFiat?: number) {
  if (!isSupabaseConfigured) {
    return true
  }

  const supabase = createSupabaseClient()

  const updates: any = {}
  if (balancePi !== undefined) updates.balance_pi = balancePi
  if (balanceFiat !== undefined) updates.balance_fiat = balanceFiat

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)

  if (error) {
    console.warn('[v0] Balance update skipped:', error)
    return true
  }

  return true
}

// Get user by ID
export async function getUserById(userId: string) {
  if (!isSupabaseConfigured) {
    return null
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.warn('[v0] Error fetching user:', error)
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

