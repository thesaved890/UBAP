export function AfricaLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring - Red (pan-African color) */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.3" />

      {/* Middle ring - Yellow (pan-African color) */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#EAB308" strokeWidth="2" opacity="0.4" />

      {/* Africa continent shape - Green (pan-African color) */}
      <path
        d="M50 15 C48 15 46 16 45 18 L43 22 L42 26 C42 26 40 28 39 30 L37 34 C37 34 36 36 36 38 L35 42 C35 44 34 46 33 48 L32 52 C32 54 31 56 31 58 C31 60 30 62 30 64 L29 68 C29 70 30 72 31 74 C32 76 34 78 36 79 C38 80 40 81 42 81 L45 81 C47 81 49 80 51 79 L54 77 C56 76 58 74 59 72 L61 68 C62 66 63 64 64 62 L65 58 C65 56 66 54 67 52 L68 48 C68 46 69 44 69 42 L70 38 C70 36 69 34 68 32 L66 28 C65 26 64 24 62 23 L59 21 C57 20 55 19 53 19 L50 19 C50 19 50 15 50 15 Z M48 25 L49 27 C49 27 50 28 51 29 L52 31 C52 31 53 32 54 33 L55 35 C55 35 56 37 56 39 L56 42 C56 44 55 46 54 48 L53 51 C52 53 51 55 50 56 L48 58 C46 59 44 60 42 60 L39 60 C37 60 35 59 34 58 L32 56 C31 54 30 52 30 50 L30 47 C30 45 31 43 32 42 L34 39 C35 37 36 36 38 35 L41 33 C43 32 45 31 47 30 L48 28 L48 25 Z"
        fill="currentColor"
        className="text-primary"
      />

      {/* Gold accent dot (representing wealth/precious materials) */}
      <circle cx="50" cy="50" r="6" fill="#EAB308" />
    </svg>
  )
}
