// Simplified vector version of the raptor artwork used for the header
// lockup, splash screen, and favicon-sized contexts, where the full
// detailed illustration (assets/images/raptor-hero.jpg) is too heavy
// to read at small sizes. Same cyan → amber gradient as the source art.
import React from 'react'

export default function RaptorMark({ className = 'h-8 w-8', title = 'Raptor' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id="raptor-mark-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M32 6 L36 22 L58 10 L40 28 L60 32 L40 36 L58 54 L36 42 L32 58 L28 42 L6 54 L24 36 L4 32 L24 28 L6 10 L28 22 Z"
        fill="url(#raptor-mark-grad)"
        stroke="#040611"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="5" fill="#040611" />
      <circle cx="32" cy="32" r="2.2" fill="url(#raptor-mark-grad)" />
    </svg>
  );
}
