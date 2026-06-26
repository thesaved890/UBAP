// Transaction limits based on user status
// Pi exchange rate: 1 Pi = $314,159
const PI_USD_RATE = 314159

export const USER_STATUS_LIMITS = {
  student: {
    limit: 5000,
    label: "Student",
    icon: "🎓",
    color: "blue",
    dailyLimit: 167,
    piLimit: 0.0159,
  },
  employee: {
    limit: 10000,
    label: "Employee/Salaried",
    icon: "💼",
    color: "green",
    dailyLimit: 333,
    piLimit: 0.0318,
  },
  entrepreneur: {
    limit: 20000,
    label: "Entrepreneur",
    icon: "🚀",
    color: "purple",
    dailyLimit: 667,
    piLimit: 0.0636,
  },
  executive: {
    limit: 40000,
    label: "Executive/CEO",
    icon: "👔",
    color: "amber",
    dailyLimit: 1333,
    piLimit: 0.1273,
  },
}

// Convert USD to Pi
export function usdToPi(usdAmount: number): number {
  return usdAmount / PI_USD_RATE
}

// Convert Pi to USD
export function piToUsd(piAmount: number): number {
  return piAmount * PI_USD_RATE
}

export type UserStatus = keyof typeof USER_STATUS_LIMITS

// Get user status from localStorage (in a real app, this would come from backend)
export function getUserStatus(): UserStatus {
  if (typeof window === "undefined") return "student"
  return (localStorage.getItem("ubap_user_status") as UserStatus) || "student"
}

// Set user status
export function setUserStatus(status: UserStatus) {
  if (typeof window === "undefined") return
  localStorage.setItem("ubap_user_status", status)
}

// Check if transaction amount is within limits
export function checkTransactionLimit(amount: number, userStatus?: UserStatus): {
  allowed: boolean
  limit: number
  remaining: number
  message: string
} {
  const status = userStatus || getUserStatus()
  const limits = USER_STATUS_LIMITS[status]
  const monthlyLimit = limits.limit

  // In a real app, you would track actual monthly spending from backend
  // For now, we'll just check against the limit
  const remaining = monthlyLimit - amount

  if (amount > monthlyLimit) {
    return {
      allowed: false,
      limit: monthlyLimit,
      remaining: 0,
      message: `Transaction of $${amount.toLocaleString()} exceeds your monthly limit of $${monthlyLimit.toLocaleString()} for ${limits.label} status.`,
    }
  }

  if (amount > limits.dailyLimit) {
    return {
      allowed: false,
      limit: limits.dailyLimit,
      remaining: limits.dailyLimit,
      message: `Transaction of $${amount.toLocaleString()} exceeds your daily limit of $${limits.dailyLimit.toLocaleString()}.`,
    }
  }

  return {
    allowed: true,
    limit: monthlyLimit,
    remaining: remaining > 0 ? remaining : 0,
    message: "Transaction within limits",
  }
}

// Format limit display
export function formatLimitDisplay(status: UserStatus) {
  const limits = USER_STATUS_LIMITS[status]
  return {
    monthly: `$${limits.limit.toLocaleString()}`,
    daily: `$${limits.dailyLimit.toLocaleString()}`,
    label: limits.label,
    icon: limits.icon,
  }
}
