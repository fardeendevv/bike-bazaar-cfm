import React from 'react';
import logoFullSvg from '../assets/images/bikebazaar_logo.svg';

interface BikeBazaarLogoProps {
  variant?: 'splash' | 'header' | 'footer' | 'emblem';
  className?: string;
}

export const BikeBazaarEmblemSvg: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="118 52 264 198"
    className={className}
    aria-label="BIKEBAZAAR SPARE PARTS Emblem"
  >
    <defs>
      <linearGradient id="bbRedMain" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E61938" />
        <stop offset="50%" stopColor="#C8102E" />
        <stop offset="100%" stopColor="#9E0B22" />
      </linearGradient>
      <linearGradient id="bbRedLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#EB2140" />
        <stop offset="100%" stopColor="#C8102E" />
      </linearGradient>
      <linearGradient id="bbRedRight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#B00D27" />
        <stop offset="100%" stopColor="#8F091E" />
      </linearGradient>
      <linearGradient id="bbDarkCircle" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#45494E" />
        <stop offset="100%" stopColor="#2B2F33" />
      </linearGradient>
      <filter id="bbDropShadow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.45" />
      </filter>
    </defs>

    <g transform="translate(0, 5)">
      {/* Outer Dark Charcoal Border Circle */}
      <circle cx="250" cy="145" r="96" fill="#23272A" />

      {/* Red 3D Ring */}
      <circle cx="250" cy="145" r="90" fill="none" stroke="url(#bbRedMain)" strokeWidth="11" />
      <circle cx="250" cy="145" r="83" fill="url(#bbDarkCircle)" stroke="#1B1E21" strokeWidth="3" />

      {/* Recessed Inner Gear Silhouette (Top Arc) */}
      <path
        d="M 192 125 L 196 112 L 204 115 A 52 52 0 0 1 212 107 L 209 98 L 219 93 L 224 101 A 52 52 0 0 1 235 97 L 236 87 L 246 86 L 248 95 A 52 52 0 0 1 258 95 L 261 86 L 271 88 L 270 97 A 52 52 0 0 1 280 102 L 286 94 L 295 100 L 290 108 A 52 52 0 0 1 298 117 L 306 114 L 310 125 A 44 44 0 0 0 192 125 Z"
        fill="#35393E"
        stroke="#26292D"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Left Spanner / Wrench */}
      <g filter="url(#bbDropShadow)" transform="translate(200, 152) rotate(-6)">
        <rect x="-4.5" y="-22" width="9" height="44" rx="3" fill="url(#bbRedMain)" stroke="#23272A" strokeWidth="2" />
        <rect x="-1.5" y="-15" width="3" height="28" rx="1.5" fill="#9E0B22" />
        <path
          d="M -9 -20 C -11 -28, -6 -35, 0 -35 C 6 -35, 11 -28, 9 -20 L 5 -18 L 4 -26 L -4 -26 L -5 -18 Z"
          fill="url(#bbRedMain)"
          stroke="#23272A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="26" r="10" fill="url(#bbRedMain)" stroke="#23272A" strokeWidth="2" />
        <circle cx="0" cy="26" r="4.5" fill="#2B2F33" stroke="#23272A" strokeWidth="1.5" />
      </g>

      {/* Right Spanner / Wrench */}
      <g filter="url(#bbDropShadow)" transform="translate(300, 152) rotate(6)">
        <rect x="-4.5" y="-22" width="9" height="44" rx="3" fill="url(#bbRedMain)" stroke="#23272A" strokeWidth="2" />
        <rect x="-1.5" y="-15" width="3" height="28" rx="1.5" fill="#9E0B22" />
        <path
          d="M -9 -20 C -11 -28, -6 -35, 0 -35 C 6 -35, 11 -28, 9 -20 L 5 -18 L 4 -26 L -4 -26 L -5 -18 Z"
          fill="url(#bbRedMain)"
          stroke="#23272A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="26" r="10" fill="url(#bbRedMain)" stroke="#23272A" strokeWidth="2" />
        <circle cx="0" cy="26" r="4.5" fill="#2B2F33" stroke="#23272A" strokeWidth="1.5" />
      </g>

      {/* Left Handlebar & Mirror */}
      <g filter="url(#bbDropShadow)">
        <path
          d="M 178 106 L 164 90 L 136 86 L 130 62 L 166 66 L 175 84 L 184 103 Z"
          fill="#23272A"
          stroke="#23272A"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <polygon points="133,64 164,68 171,84 139,83" fill="url(#bbRedLeft)" />
        <path d="M 164 83 L 180 103" stroke="url(#bbRedMain)" strokeWidth="5" strokeLinecap="round" />

        <path
          d="M 225 123 L 196 105 L 138 114 L 136 102 L 198 94 L 230 115 Z"
          fill="#23272A"
          stroke="#23272A"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M 226 119 L 197 100 L 139 108"
          fill="none"
          stroke="url(#bbRedLeft)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="174"
          y="94"
          width="11"
          height="20"
          rx="3"
          transform="rotate(-7 179 104)"
          fill="url(#bbRedMain)"
          stroke="#23272A"
          strokeWidth="2.5"
        />
      </g>

      {/* Right Handlebar & Mirror */}
      <g filter="url(#bbDropShadow)">
        <path
          d="M 322 106 L 336 90 L 364 86 L 370 62 L 334 66 L 325 84 L 316 103 Z"
          fill="#23272A"
          stroke="#23272A"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <polygon points="367,64 336,68 329,84 361,83" fill="url(#bbRedRight)" />
        <path d="M 336 83 L 320 103" stroke="url(#bbRedMain)" strokeWidth="5" strokeLinecap="round" />

        <path
          d="M 275 123 L 304 105 L 362 114 L 364 102 L 302 94 L 270 115 Z"
          fill="#23272A"
          stroke="#23272A"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M 274 119 L 303 100 L 361 108"
          fill="none"
          stroke="url(#bbRedRight)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="315"
          y="94"
          width="11"
          height="20"
          rx="3"
          transform="rotate(7 321 104)"
          fill="url(#bbRedMain)"
          stroke="#23272A"
          strokeWidth="2.5"
        />
      </g>

      {/* Center Motorcycle Headlight Mask / Cowl */}
      <g filter="url(#bbDropShadow)">
        <path
          d="M 228 106 L 272 106 L 288 134 L 270 202 L 250 208 L 230 202 L 212 134 Z"
          fill="#1E2124"
          stroke="#1E2124"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path d="M 215 134 L 226 118 L 231 198 L 225 196 Z" fill="url(#bbRedLeft)" />
        <path d="M 285 134 L 274 118 L 269 198 L 275 196 Z" fill="url(#bbRedRight)" />

        <polygon points="250,109 230,109 220,132 232,150 250,156" fill="url(#bbRedLeft)" />
        <polygon points="250,109 270,109 280,132 268,150 250,156" fill="url(#bbRedRight)" />

        <polygon points="250,162 231,155 236,200 250,204" fill="url(#bbRedLeft)" />
        <polygon points="250,162 269,155 264,200 250,204" fill="url(#bbRedRight)" />
      </g>
    </g>
  </svg>
);

export const BikeBazaarLogo: React.FC<BikeBazaarLogoProps> = ({
  variant = 'header',
  className = '',
}) => {
  if (variant === 'emblem') {
    return <BikeBazaarEmblemSvg className={className || 'w-12 h-12'} />;
  }

  if (variant === 'splash') {
    return (
      <div className={`flex flex-col items-center select-none ${className}`}>
        <img
          src={logoFullSvg}
          alt="BIKEBAZAAR SPARE PARTS"
          className="w-64 sm:w-80 h-auto object-contain drop-shadow-sm"
        />
      </div>
    );
  }

  // Header & Footer horizontal lockup
  const isHeader = variant === 'header';
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        <BikeBazaarEmblemSvg className={isHeader ? 'w-13 h-11 sm:w-14 sm:h-12' : 'w-12 h-10'} />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider uppercase leading-none text-white">
          <span className="text-[#C8102E]">BIKE</span>BAZAAR
        </span>
        <span className="text-[9px] sm:text-[10px] text-gray-300 tracking-[0.26em] font-bold uppercase mt-0.5">
          SPARE PARTS
        </span>
      </div>
    </div>
  );
};

interface SplashLoaderProps {
  isFinishing: boolean;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ isFinishing }) => {
  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6 transition-all duration-500 ${
        isFinishing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle radial workshop lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at center, #F3F4F6 0%, #FFFFFF 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Main Uploaded BIKEBAZAAR SPARE PARTS Logo */}
        <div className="animate-logo-entrance">
          <BikeBazaarLogo variant="splash" />
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 sm:w-56 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-6 shadow-inner">
          <div className="h-full bg-[#C8102E] rounded-full animate-loader-bar" />
        </div>

        <p className="mt-3 text-[11px] font-heading uppercase tracking-[0.2em] text-[#6B7280]">
          Asli Parts · Sahi Daam
        </p>
      </div>
    </div>
  );
};
