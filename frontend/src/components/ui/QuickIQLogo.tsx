import { motion } from 'framer-motion';

interface QuickIQLogoProps {
  size?: number;
  className?: string;
}

export default function QuickIQLogo({ size = 64, className = '' }: QuickIQLogoProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const coreRadius = size * 0.15;
  const waveRadius = size * 0.35;
  const sparkLength = size * 0.2;

  return (
    <motion.div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        cursor: 'pointer',
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      initial={{ scale: 1 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(108, 99, 255, 0.3))',
        }}
      >
        <defs>
          {/* Core Gradient */}
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity="1" />
            <stop offset="50%" stopColor="#A3A1FB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.7" />
          </radialGradient>

          {/* Wave Gradient */}
          <radialGradient id="waveGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A3A1FB" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#6C63FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#A3A1FB" stopOpacity="0" />
          </radialGradient>

          {/* Spark Gradient */}
          <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD580" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#6C63FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A3A1FB" stopOpacity="0.4" />
          </linearGradient>

          {/* Animated Gradient for Core */}
          <radialGradient id="animatedCoreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity="1">
              <animate
                attributeName="stop-color"
                values="#6C63FF;#A3A1FB;#6C63FF"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="#A3A1FB" stopOpacity="0.9">
              <animate
                attributeName="stop-color"
                values="#A3A1FB;#6C63FF;#A3A1FB"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.7">
              <animate
                attributeName="stop-color"
                values="#6C63FF;#A3A1FB;#6C63FF"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </radialGradient>

          {/* Glow Filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Wave Rings */}
        {[0, 1, 2].map((index) => (
          <circle
            key={`wave-${index}`}
            cx={centerX}
            cy={centerY}
            r={waveRadius + index * (size * 0.08)}
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth={size * 0.01}
            opacity={0.4 - index * 0.1}
          >
            <animate
              attributeName="r"
              values={`${waveRadius + index * (size * 0.08)};${waveRadius + index * (size * 0.08) + size * 0.02};${waveRadius + index * (size * 0.08)}`}
              dur={`${2 + index * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values={`${0.4 - index * 0.1};${0.3 - index * 0.1};${0.4 - index * 0.1}`}
              dur={`${2 + index * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Spark Lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
          const radian = (angle * Math.PI) / 180;
          const startX = centerX + Math.cos(radian) * (coreRadius + size * 0.05);
          const startY = centerY + Math.sin(radian) * (coreRadius + size * 0.05);
          const endX = centerX + Math.cos(radian) * (waveRadius + sparkLength);
          const endY = centerY + Math.sin(radian) * (waveRadius + sparkLength);

          return (
            <line
              key={`spark-${index}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="url(#sparkGradient)"
              strokeWidth={size * 0.008}
              strokeLinecap="round"
              opacity={0.6}
              filter="url(#glow)"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur={`${1.5 + index * 0.2}s`}
                repeatCount="indefinite"
                begin={`${index * 0.1}s`}
              />
            </line>
          );
        })}

        {/* Neural Core - Hexagonal Shape */}
        <polygon
          points={`
            ${centerX},${centerY - coreRadius}
            ${centerX + coreRadius * 0.866},${centerY - coreRadius * 0.5}
            ${centerX + coreRadius * 0.866},${centerY + coreRadius * 0.5}
            ${centerX},${centerY + coreRadius}
            ${centerX - coreRadius * 0.866},${centerY + coreRadius * 0.5}
            ${centerX - coreRadius * 0.866},${centerY - coreRadius * 0.5}
          `}
          fill="url(#animatedCoreGradient)"
          filter="url(#glow)"
        />

        {/* Inner Core Circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={coreRadius * 0.6}
          fill="url(#coreGradient)"
          opacity="0.8"
        >
          <animate
            attributeName="r"
            values={`${coreRadius * 0.6};${coreRadius * 0.7};${coreRadius * 0.6}`}
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Central Dot */}
        <circle
          cx={centerX}
          cy={centerY}
          r={coreRadius * 0.25}
          fill="#FFD580"
          opacity="0.9"
        >
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  );
}

