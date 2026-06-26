export function UbapiIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Radial gradient background */}
        <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0D5C4D" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        
        {/* Gold gradient for continent */}
        <linearGradient id="continentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDB022" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Main circle background with radial gradient */}
      <circle cx="256" cy="256" r="256" fill="url(#bgGradient)" />

      {/* Subtle concentric circles background */}
      <circle cx="256" cy="256" r="230" fill="none" stroke="#065F46" strokeWidth="1" opacity="0.2" />
      <circle cx="256" cy="256" r="200" fill="none" stroke="#065F46" strokeWidth="1" opacity="0.2" />
      <circle cx="256" cy="256" r="170" fill="none" stroke="#065F46" strokeWidth="1" opacity="0.15" />

      {/* African continent silhouette - 65% of diameter (333px) */}
      <g transform="translate(256, 256)">
        {/* Simplified African continent path */}
        <path
          d="M -10,-120 
             L 15,-125 
             L 35,-120 
             L 50,-110 
             L 60,-95 
             L 68,-75 
             L 70,-50 
             L 72,-20 
             L 70,10 
             L 65,40 
             L 58,65 
             L 48,85 
             L 35,100 
             L 18,110 
             L 0,115 
             L -20,115 
             L -40,110 
             L -58,100 
             L -72,85 
             L -82,65 
             L -88,40 
             L -90,10 
             L -88,-20 
             L -82,-50 
             L -72,-75 
             L -58,-95 
             L -40,-110 
             L -20,-120 
             Z"
          fill="url(#continentGradient)"
          opacity="0.95"
        />

        {/* Circuit board lines on continent */}
        <path d="M -50,-60 L -20,-60 L -20,-30" stroke="#065F46" strokeWidth="2" opacity="0.6" />
        <path d="M 30,-40 L 50,-40 L 50,-10" stroke="#065F46" strokeWidth="2" opacity="0.6" />
        <path d="M -40,20 L -10,20 L -10,50" stroke="#065F46" strokeWidth="2" opacity="0.6" />
        <path d="M 20,40 L 40,40 L 40,70" stroke="#065F46" strokeWidth="2" opacity="0.6" />

        {/* Circuit board nodes (8px) */}
        <circle cx="-20" cy="-60" r="4" fill="#14B8A6" />
        <circle cx="50" cy="-40" r="4" fill="#14B8A6" />
        <circle cx="-10" cy="20" r="4" fill="#14B8A6" />
        <circle cx="40" cy="40" r="4" fill="#14B8A6" />
        <circle cx="-50" cy="-30" r="4" fill="#14B8A6" />
        <circle cx="30" cy="70" r="4" fill="#14B8A6" />

        {/* Scattered dot markers */}
        <circle cx="-60" cy="-80" r="3" fill="#FBBF24" opacity="0.7" />
        <circle cx="55" cy="-70" r="3" fill="#FBBF24" opacity="0.7" />
        <circle cx="-70" cy="0" r="3" fill="#FBBF24" opacity="0.7" />
        <circle cx="60" cy="20" r="3" fill="#FBBF24" opacity="0.7" />
        <circle cx="-50" cy="60" r="3" fill="#FBBF24" opacity="0.7" />
        <circle cx="50" cy="90" r="3" fill="#FBBF24" opacity="0.7" />

        {/* Large Pi symbol in center - 40% of continent height (~133px) */}
        <text
          x="0"
          y="15"
          fontSize="140"
          fontWeight="800"
          fill="#FBBF24"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        >
          π
        </text>

        {/* Small dollar sign in circle at bottom */}
        <g transform="translate(0, 130)">
          <circle cx="0" cy="0" r="18" fill="#F59E0B" opacity="0.9" />
          <text
            x="0"
            y="8"
            fontSize="22"
            fontWeight="700"
            fill="#FFFFFF"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
          >
            $
          </text>
        </g>

        {/* Small pickaxe icon top-left */}
        <g transform="translate(-85, -100) scale(0.8)">
          <path
            d="M 0,0 L 12,-12 M 12,-12 L 18,-6 M 12,-12 L 6,-18 M 0,0 L -6,6 L 0,12 L 6,6 Z"
            stroke="#FBBF24"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
}
