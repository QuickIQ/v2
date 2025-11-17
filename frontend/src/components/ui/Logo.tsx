import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { useMobile } from '../../hooks/useMobile';

interface LogoProps {
  size?: number;
  animated?: boolean;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 48, animated = true, showText = true, className = '' }: LogoProps) {
  const isMobile = useMobile();
  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  const brainVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`logo-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: showText ? (size > 60 ? '0px' : '8px') : '0px',
        cursor: 'pointer',
        justifyContent: 'center',
      }}
      variants={animated ? logoVariants : {}}
      whileHover={isMobile || !animated ? {} : "hover"}
      initial="initial"
    >
      {/* Logo Icon */}
      <motion.div
        style={{
          position: 'relative',
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variants={animated ? brainVariants : {}}
        animate={animated ? "animate" : "initial"}
      >
        {/* Gradient Circle Background */}
        <motion.div
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
            zIndex: 0,
          }}
          animate={animated ? {
            boxShadow: [
              '0 4px 20px rgba(102, 126, 234, 0.4)',
              '0 6px 30px rgba(102, 126, 234, 0.6)',
              '0 4px 20px rgba(102, 126, 234, 0.4)',
            ],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Brain Icon */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 1,
            color: 'white',
          }}
        >
          <Brain size={size * 0.6} strokeWidth={2.5} />
        </motion.div>

        {/* Electric Effect */}
        {animated && (
          <>
            {/* Main lightning bolts - more dramatic */}
            {[...Array(4)].map((_, i) => {
              // Start from right (0°), then clockwise: 0°, 270°, 180°, 90°
              const clockwiseAngles = [0, 270, 180, 90];
              const angle = (clockwiseAngles[i] * Math.PI / 180);
              const svgSize = size * 2;
              const centerX = svgSize / 2;
              const centerY = svgSize / 2;
              const length = size * 0.7;
              
              // Create more organic zigzag lightning path starting from exact center
              const path = (() => {
                const points: string[] = [`M ${centerX} ${centerY}`];
                const segments = 8;
                for (let j = 1; j <= segments; j++) {
                  const progress = j / segments;
                  // Vary the offset for more natural lightning effect (deterministic)
                  const variance = 0.7 + ((j + i) % 3) * 0.15;
                  const baseX = centerX + Math.cos(angle) * length * progress;
                  const baseY = centerY + Math.sin(angle) * length * progress;
                  // More varied zigzag pattern
                  const offset = (j % 2 === 0 ? 1 : -1) * (size * 0.08 * variance);
                  const perpAngle = angle + Math.PI / 2;
                  const x = baseX + Math.cos(perpAngle) * offset;
                  const y = baseY + Math.sin(perpAngle) * offset;
                  points.push(`L ${x} ${y}`);
                }
                return points.join(' ');
              })();
              
              return (
                <motion.svg
                  key={`bolt-${i}`}
                  style={{
                    position: 'absolute',
                    width: svgSize,
                    height: svgSize,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1,
                    pointerEvents: 'none',
                    overflow: 'visible',
                  }}
                  viewBox={`0 0 ${svgSize} ${svgSize}`}
                >
                  <defs>
                    <linearGradient id={`electricGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#667eea" stopOpacity="1" />
                      <stop offset="30%" stopColor="#764ba2" stopOpacity="0.85" />
                      <stop offset="60%" stopColor="#f093fb" stopOpacity="0.7" />
                      <stop offset="85%" stopColor="#ffffff" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <filter id={`glow${i}`}>
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id={`glowIntense${i}`}>
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Main lightning bolt with glow */}
                  <motion.path
                    d={path}
                    stroke={`url(#electricGrad${i})`}
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#glow${i})`}
                    style={{
                      opacity: 0.8,
                    }}
                    animate={{
                      pathLength: [0, 1, 1, 0],
                      opacity: [0, 0.95, 0.7, 0],
                      strokeWidth: [2.5, 4, 3.5, 2],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                      times: [0, 0.25, 0.75, 1],
                    }}
                  />
                  {/* Bright core line */}
                  <motion.path
                    d={path}
                    stroke="#ffffff"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#glowIntense${i})`}
                    style={{
                      opacity: 0.6,
                    }}
                    animate={{
                      pathLength: [0, 1, 1, 0],
                      opacity: [0, 0.9, 0.5, 0],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.6 + 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                      times: [0, 0.25, 0.75, 1],
                    }}
                  />
                </motion.svg>
              );
            })}
            
            {/* Secondary smaller lightning branches */}
            {[...Array(8)].map((_, i) => {
              // Clockwise order: 0°, 315°, 270°, 225°, 180°, 135°, 90°, 45°
              const clockwiseAngles = [0, 315, 270, 225, 180, 135, 90, 45];
              const angle = (clockwiseAngles[i] * Math.PI / 180);
              const svgSize = size * 1.5;
              const centerX = svgSize / 2;
              const centerY = svgSize / 2;
              const length = size * 0.4;
              
              const path = (() => {
                const points: string[] = [`M ${centerX} ${centerY}`];
                const segments = 5;
                for (let j = 1; j <= segments; j++) {
                  const progress = j / segments;
                  // Deterministic variance for consistent appearance
                  const variance = 0.8 + ((j + i) % 3) * 0.1;
                  const baseX = centerX + Math.cos(angle) * length * progress;
                  const baseY = centerY + Math.sin(angle) * length * progress;
                  const offset = (j % 2 === 0 ? 1 : -1) * (size * 0.05 * variance);
                  const perpAngle = angle + Math.PI / 2;
                  const x = baseX + Math.cos(perpAngle) * offset;
                  const y = baseY + Math.sin(perpAngle) * offset;
                  points.push(`L ${x} ${y}`);
                }
                return points.join(' ');
              })();
              
              return (
                <motion.svg
                  key={`branch-${i}`}
                  style={{
                    position: 'absolute',
                    width: svgSize,
                    height: svgSize,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1,
                    pointerEvents: 'none',
                    overflow: 'visible',
                  }}
                  viewBox={`0 0 ${svgSize} ${svgSize}`}
                >
                  <defs>
                    <linearGradient id={`branchGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={i % 2 === 0 ? "#667eea" : "#764ba2"} stopOpacity="0.9" />
                      <stop offset="50%" stopColor={i % 2 === 0 ? "#764ba2" : "#f093fb"} stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={path}
                    stroke={`url(#branchGrad${i})`}
                    strokeWidth="2.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      filter: 'drop-shadow(0 0 5px rgba(102, 126, 234, 0.6))',
                      opacity: 0.7,
                    }}
                    animate={{
                      pathLength: [0, 1, 1, 0],
                      opacity: [0, 0.8, 0.6, 0],
                      strokeWidth: [1.8, 2.5, 2.2, 1.5],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: [0.25, 0.1, 0.25, 1],
                      times: [0, 0.3, 0.75, 1],
                    }}
                  />
                </motion.svg>
              );
            })}
            
          </>
        )}
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            lineHeight: 1.2,
            marginLeft: size > 60 ? '28px' : '16px',
            alignSelf: 'center',
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            style={{
              fontSize: size * 0.75,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px',
              filter: 'drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3))',
              lineHeight: '1',
              display: 'block',
            }}
          >
            QuickIQ
          </motion.span>
          {size > 40 && (
            <motion.span
              style={{
                fontSize: size * 0.25,
                color: '#666',
                fontWeight: '400',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginTop: '6px',
                display: 'block',
              }}
            >
              Intelligence Test
            </motion.span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Compact version for smaller spaces
export function LogoCompact({ size = 32 }: { size?: number }) {
  const isMobile = useMobile();
  
  return (
    <motion.div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      whileHover={isMobile ? {} : { scale: 1.1 }}
      whileTap={isMobile ? {} : { scale: 0.95 }}
    >
      <div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 2px 12px rgba(102, 126, 234, 0.4)',
        }}
      />
      <Brain size={size * 0.6} color="white" strokeWidth={2.5} />
    </motion.div>
  );
}

