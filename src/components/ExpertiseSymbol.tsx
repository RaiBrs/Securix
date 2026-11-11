type Motif = 'offensive' | 'intelligence' | 'infrastructure' | 'response'

export function ExpertiseSymbol({ motif }: { motif: Motif }) {
  const gradientId = `expertise-metal-${motif}`

  return (
    <svg className={`expertise-symbol expertise-symbol--${motif}`} viewBox="0 0 520 380" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="92" y1="45" x2="420" y2="330" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C8B5FF" />
          <stop offset=".48" stopColor="#8164CC" />
          <stop offset="1" stopColor="#3F315C" />
        </linearGradient>
      </defs>
      {motif === 'offensive' && (
        <g stroke={`url(#${gradientId})`} strokeWidth="1.5">
          <circle cx="260" cy="190" r="142" opacity=".38" />
          <circle cx="260" cy="190" r="108" opacity=".7" />
          <circle cx="260" cy="190" r="64" />
          <path d="M260 28v82m0 160v82M98 190h82m160 0h82" opacity=".65" />
          <path d="m260 126 64 64-64 64-64-64 64-64Z" strokeWidth="2.5" />
          <path d="M260 160v60m-30-30h60" strokeWidth="2" />
          <path d="M132 100h33v-33m223 213h-33v33" opacity=".65" />
          <circle cx="260" cy="190" r="8" fill="#A990FF" stroke="none" />
          <circle cx="260" cy="48" r="4" fill="#A990FF" stroke="none" />
          <circle cx="402" cy="190" r="4" fill="#A990FF" stroke="none" />
        </g>
      )}
      {motif === 'intelligence' && (
        <g stroke={`url(#${gradientId})`} strokeWidth="1.5">
          <path d="M112 264 171 88 285 126 389 78 418 242 293 316 112 264Z" opacity=".44" />
          <path d="M171 88 254 201 389 78M112 264l142-63 164 41M285 126l8 190M171 88l122 228M389 78 112 264" opacity=".58" />
          <circle cx="254" cy="201" r="43" strokeWidth="2.5" />
          <circle cx="254" cy="201" r="23" opacity=".7" />
          <circle cx="254" cy="201" r="6" fill="#C8B5FF" stroke="none" />
          {[[112,264],[171,88],[285,126],[389,78],[418,242],[293,316]].map(([x,y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="13" fill="#171320" strokeWidth="2" />
              <circle cx={x} cy={y} r="3.5" fill="#A990FF" stroke="none" />
            </g>
          ))}
        </g>
      )}
      {motif === 'infrastructure' && (
        <g stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinejoin="round">
          <path d="m91 231 169-79 169 79-169 79-169-79Z" fill="#1B1727" strokeWidth="2" />
          <path d="m91 231 169 79v38L91 269v-38Zm338 0-169 79v38l169-79v-38Z" fill="#211B30" opacity=".8" />
          <path d="m125 171 135-63 135 63-135 63-135-63Z" fill="#211B30" strokeWidth="2" />
          <path d="m125 171 135 63v36l-135-63v-36Zm270 0-135 63v36l135-63v-36Z" fill="#171320" opacity=".8" />
          <path d="m160 114 100-47 100 47-100 47-100-47Z" fill="#2D2342" strokeWidth="2" />
          <path d="m160 114 100 47v33l-100-47v-33Zm200 0-100 47v33l100-47v-33Z" fill="#211B30" />
          <path d="M260 39v28m0 127v40m0 76v38M67 231h24m338 0h24" opacity=".65" />
          <circle cx="260" cy="39" r="5" fill="#A990FF" stroke="none" />
          <circle cx="67" cy="231" r="4" fill="#A990FF" stroke="none" />
          <circle cx="453" cy="231" r="4" fill="#A990FF" stroke="none" />
        </g>
      )}
      {motif === 'response' && (
        <g stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round">
          <circle cx="260" cy="190" r="141" opacity=".35" />
          <path d="M130 137a141 141 0 0 1 250-23" strokeWidth="6" />
          <path d="M390 244a141 141 0 0 1-249 24" strokeWidth="6" />
          <path d="m381 102 3 25-25-5m-222 159-4-25 25 5" strokeWidth="3" />
          <circle cx="260" cy="190" r="89" opacity=".6" />
          <circle cx="260" cy="190" r="42" strokeWidth="2" />
          <path d="M260 148v43l32 20" strokeWidth="3" />
          <path d="M260 49v49m0 184v49M119 190h49m184 0h49" opacity=".5" />
          <circle cx="260" cy="190" r="6" fill="#C8B5FF" stroke="none" />
          <circle cx="380" cy="114" r="5" fill="#C8B5FF" stroke="none" />
          <circle cx="141" cy="268" r="5" fill="#C8B5FF" stroke="none" />
        </g>
      )}
    </svg>
  )
}
