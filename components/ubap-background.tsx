export function UBAPBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Green gradient overlay - Subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-100/40 to-teal-100/50 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-teal-900/30" />
      
      {/* Large UBAP watermark in Gold - Subtle */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] dark:opacity-[0.20] select-none">
        <div className="text-center transform -rotate-12">
          <h1 className="text-[20rem] font-black tracking-tighter text-yellow-600 dark:text-yellow-500" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            UBAP
          </h1>
          <p className="text-6xl font-bold text-amber-700 dark:text-amber-400 mt-4 tracking-wide">
            United Bank for African Pioneers
          </p>
        </div>
      </div>

      {/* Pattern overlay - Subtle with gold */}
      <div 
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, #d97706 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}
