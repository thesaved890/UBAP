import { createClient } from '@supabase/supabase-js'

class NoopQueryBuilder {
  constructor(private readonly tableName: string) {}

  select() { return this }
  insert() { return this }
  update() { return this }
  delete() { return this }
  eq() { return this }
  order() { return this }
  limit() { return this }
  range() { return this }
  maybeSingle() {
    return Promise.resolve({
      data: null,
      error: { message: 'Supabase not configured', code: 'SUPABASE_NOT_CONFIGURED' },
    })
  }
  single() {
    return Promise.resolve({
      data: null,
      error: { message: 'Supabase not configured', code: 'SUPABASE_NOT_CONFIGURED' },
    })
  }
}

class NoopSupabaseClient {
  from(table: string) {
    return new NoopQueryBuilder(table)
  }

  rpc() {
    return Promise.resolve({
      data: null,
      error: { message: 'Supabase not configured', code: 'SUPABASE_NOT_CONFIGURED' },
    })
  }
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || ''
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co'))

function createClientOrFallback() {
  if (!isSupabaseConfigured) {
    return new NoopSupabaseClient() as any
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export const supabase = createClientOrFallback()

// Export function to create client (for server-side usage)
export function createSupabaseClient() {
  return createClientOrFallback()
}

// User operations
export const userService = {
  async createUser(piUid: string, userData: {
    username: string
    email?: string
    phone?: string
    country?: string
    preferred_language?: string
  }) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ pi_uid: piUid, ...userData }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserByPiUid(piUid: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('pi_uid', piUid)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateUserBalance(piUid: string, piBalance: number, fiatBalance: number) {
    const { data, error } = await supabase
      .from('users')
      .update({ pi_balance: piBalance, fiat_balance: fiatBalance })
      .eq('pi_uid', piUid)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateUserLanguage(piUid: string, language: string) {
    const { data, error } = await supabase
      .from('users')
      .update({ preferred_language: language })
      .eq('pi_uid', piUid)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Transaction operations
export const transactionService = {
  async createTransaction(userId: string, transactionData: {
    transaction_type: string
    amount: number
    currency: string
    recipient?: string
    status?: string
    reference_number?: string
    metadata?: any
  }) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ user_id: userId, ...transactionData }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserTransactions(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  },

  async updateTransactionStatus(transactionId: string, status: string) {
    const { data, error } = await supabase
      .from('transactions')
      .update({ status })
      .eq('id', transactionId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Virtual Card operations
export const cardService = {
  async createCard(userId: string, cardData: {
    card_number: string
    cardholder_name: string
    expiry_date: string
    cvv: string
    card_type?: string
  }) {
    const { data, error } = await supabase
      .from('virtual_cards')
      .insert([{ user_id: userId, ...cardData }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserCards(userId: string) {
    const { data, error } = await supabase
      .from('virtual_cards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateCardStatus(cardId: string, status: string) {
    const { data, error } = await supabase
      .from('virtual_cards')
      .update({ status })
      .eq('id', cardId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateCardBalance(cardId: string, balance: number) {
    const { data, error } = await supabase
      .from('virtual_cards')
      .update({ balance })
      .eq('id', cardId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Savings operations
export const savingsService = {
  async createSavingsGoal(userId: string, goalData: {
    goal_name: string
    target_amount: number
    currency?: string
    deadline?: string
    icon?: string
  }) {
    const { data, error } = await supabase
      .from('savings_goals')
      .insert([{ user_id: userId, ...goalData }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserSavingsGoals(userId: string) {
    const { data, error } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  async updateSavingsProgress(goalId: string, currentAmount: number) {
    const { data, error } = await supabase
      .from('savings_goals')
      .update({ current_amount: currentAmount })
      .eq('id', goalId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async createGroupSavings(creatorId: string, groupData: {
    group_name: string
    target_amount: number
    currency?: string
    deadline?: string
  }) {
    const { data, error } = await supabase
      .from('group_savings')
      .insert([{ creator_id: creatorId, ...groupData }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async joinGroupSavings(groupId: string, userId: string) {
    const { data, error } = await supabase
      .from('group_savings_members')
      .insert([{ group_id: groupId, user_id: userId }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Bank Account operations
export const bankAccountService = {
  async addBankAccount(userId: string, accountData: {
    bank_name: string
    account_number: string
    account_name: string
    country: string
    is_primary?: boolean
  }) {
    const { data, error } = await supabase
      .from('bank_accounts')
      .insert([{ user_id: userId, ...accountData }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserBankAccounts(userId: string) {
    const { data, error } = await supabase
      .from('bank_accounts')
      .select('*')
      .eq('user_id', userId)
      .order('is_primary', { ascending: false })
    
    if (error) throw error
    return data
  }
}

// Mobile Money operations
export const mobileMoneyService = {
  async addMobileMoneyAccount(userId: string, accountData: {
    provider: string
    phone_number: string
    account_name: string
    is_primary?: boolean
  }) {
    const { data, error } = await supabase
      .from('mobile_money_accounts')
      .insert([{ user_id: userId, ...accountData }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserMobileMoneyAccounts(userId: string) {
    const { data, error } = await supabase
      .from('mobile_money_accounts')
      .select('*')
      .eq('user_id', userId)
      .order('is_primary', { ascending: false })
    
    if (error) throw error
    return data
  }
}
