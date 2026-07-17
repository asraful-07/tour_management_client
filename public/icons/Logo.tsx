export default function Logo() {
  return (
    <svg
      width="90"
      height="36"
      viewBox="0 0 90 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#FF7A00" />
        </linearGradient>

        <linearGradient id="logoGradient2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD194" />
          <stop offset="100%" stopColor="#FF9A3D" />
        </linearGradient>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3"
            floodColor="#FF7A00"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      <g filter="url(#shadow)">
        <path d="M18 4L4 32H18L32 4H18Z" fill="url(#logoGradient2)" rx="3" />

        <path d="M38 4L20 32H38L56 4H38Z" fill="url(#logoGradient1)" />

        <path d="M62 4L40 32H62L84 4H62Z" fill="#FF6B00" />
      </g>
    </svg>
  );
}
