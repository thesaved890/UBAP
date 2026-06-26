export function BalanceCardSkeleton() {
  return (
    <div className="bg-card rounded-lg p-4 space-y-3">
      <div className="skeleton h-4 w-24" />
      <div className="skeleton h-8 w-32" />
      <div className="skeleton h-3 w-20" />
    </div>
  )
}

export function TransactionSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="skeleton h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton h-3 w-24" />
      </div>
      <div className="skeleton h-5 w-16" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="space-y-2 p-4">
      <div className="skeleton h-4 w-20" />
      <div className="skeleton h-32 w-full" />
    </div>
  )
}
