import { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { loadTestContent, TestContent } from '../../utils/testContentLoader';
import { LoadingFallback } from '../ui/LoadingFallback';
import { ErrorFallback } from '../ui/ErrorFallback';
import { useTestsCompletedCounter } from '../../hooks/useTestsCompletedCounter';
import '../../App.css';

/**
 * Güvenli renk parse fonksiyonu
 * Tüm formatları handle eder: hex, rgb, rgba, gradient string
 */
function extractBaseColor(
  progressBarFill: string | undefined,
  primaryMain: string | undefined,
  fallback: string = '#6C63FF'
): string {
  try {
    // 1. progressBarFill yoksa primaryMain kullan
    if (!progressBarFill) {
      return primaryMain || fallback;
    }

    // 2. Gradient string'den hex çıkar
    if (progressBarFill.includes('linear-gradient') || progressBarFill.includes('gradient')) {
      // 6 haneli hex (#RRGGBB)
      const hex6Match = progressBarFill.match(/#([0-9A-Fa-f]{6})\b/);
      if (hex6Match) {
        return hex6Match[0];
      }
      
      // 3 haneli hex (#RGB)
      const hex3Match = progressBarFill.match(/#([0-9A-Fa-f]{3})\b/);
      if (hex3Match) {
        const r = hex3Match[1][0];
        const g = hex3Match[1][1];
        const b = hex3Match[1][2];
        return `#${r}${r}${g}${g}${b}${b}`;
      }
      
      // RGB/RGBA formatı
      const rgbMatch = progressBarFill.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1], 10).toString(16).padStart(2, '0');
        const g = parseInt(rgbMatch[2], 10).toString(16).padStart(2, '0');
        const b = parseInt(rgbMatch[3], 10).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
      }
    }

    // 3. Direkt hex kontrolü
    if (progressBarFill.startsWith('#')) {
      // 3 haneli hex'i 6 haneliye çevir
      if (progressBarFill.length === 4) {
        const r = progressBarFill[1];
        const g = progressBarFill[2];
        const b = progressBarFill[3];
        return `#${r}${r}${g}${g}${b}${b}`;
      }
      // 6 haneli hex geçerli mi kontrol et
      if (progressBarFill.length === 7 && /^#[0-9A-Fa-f]{6}$/.test(progressBarFill)) {
        return progressBarFill;
      }
    }

    // 4. Fallback
    return primaryMain || fallback;
  } catch (error) {
    console.warn('Color extraction failed, using fallback:', error);
    return primaryMain || fallback;
  }
}



interface Props {
  testId: string;
  onComplete?: () => void;
}

export default function UniversalAnalyzingPage({ testId, onComplete }: Props) {
  const { i18n } = useTranslation();
  const isMobile = useMobile();
  const language = i18n.language as 'en' | 'tr';
  const [content, setContent] = useState<TestContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setProgress] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(1);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [countAnimationFinished, setCountAnimationFinished] = useState(false);
  const countAnimationStarted = useRef(false);
  const { count: targetCount } = useTestsCompletedCounter();
  const targetCountRef = useRef(targetCount);

  // Update ref whenever targetCount changes (but don't restart animation)
  useEffect(() => {
    targetCountRef.current = targetCount;
    // If animation already finished, just update the displayed count
    if (countAnimationFinished) {
      setAnimatedCount(targetCount);
    }
  }, [targetCount, countAnimationFinished]);

  // Hide scrollbar on analyzing page
  useEffect(() => {
    document.body.classList.add('landing-page-no-scrollbar');
    document.documentElement.classList.add('landing-page-no-scrollbar');
    
    return () => {
      document.body.classList.remove('landing-page-no-scrollbar');
      document.documentElement.classList.remove('landing-page-no-scrollbar');
    };
  }, []);

  // Reset animation state ONLY when component mounts or testId changes (NOT when targetCount changes)
  useEffect(() => {
    countAnimationStarted.current = false;
    setCountAnimationFinished(false);
    setAnimatedCount(1);
    targetCountRef.current = targetCount; // Reset ref as well
  }, [testId]); // Removed targetCount from dependencies

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        setError(null);
        const loadedContent = await loadTestContent(testId);
        if (!loadedContent) {
          const errorMsg = `Test content not found for: ${testId}`;
          setError(errorMsg);
        } else {
          setContent(loadedContent);
        }
      } catch (err: any) {
        const errorMsg = `Failed to load content for ${testId}: ${err.message || err}`;
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [testId]);

  // Animate count from 1 to target in 2 seconds (only once per testId)
  // NOTE: targetCount is NOT in dependencies - we capture it when animation starts
  // This prevents animation from restarting when targetCount updates
  useEffect(() => {
    if (!content) return;
    // Wait for targetCount to be available, but don't restart animation if it changes
    if (!targetCount || targetCount <= 0) return;
    
    // CRITICAL: Check if animation already started - if so, NEVER restart it
    if (countAnimationStarted.current) {
      return;
    }

    // Start animation (only once) - mark as started immediately to prevent re-triggers
    countAnimationStarted.current = true;
    setAnimatedCount(1);
    setCountAnimationFinished(false);
    const initialTarget = targetCount; // Capture current targetCount at animation start
    targetCountRef.current = initialTarget; // Store initial value in ref

    const countDuration = 2000; // 2 seconds
    const countSteps = 60; // 60 steps for smooth animation
    const startCount = 1;
    const countInterval = countDuration / countSteps;

    let currentStep = 0;
    const countTimer = setInterval(() => {
      currentStep++;
      
      // Use the initial target captured at animation start (don't update during animation)
      const countIncrement = (initialTarget - startCount) / countSteps;
      const currentCount = startCount + (countIncrement * currentStep);
      
      if (currentCount >= initialTarget || currentStep >= countSteps) {
        // When animation finishes, use the initial target (animation should complete to the value it started with)
        setAnimatedCount(initialTarget);
        setCountAnimationFinished(true);
        // After animation finishes, update to latest targetCount if it changed
        // Use the ref which is updated by the separate useEffect
        const latestTarget = targetCountRef.current;
        if (latestTarget !== initialTarget) {
          setAnimatedCount(latestTarget);
        }
        clearInterval(countTimer);
      } else {
        setAnimatedCount(Math.floor(currentCount));
      }
    }, countInterval);

    return () => {
      clearInterval(countTimer);
      // Don't reset countAnimationStarted here - it should persist until testId changes
    };
  }, [content, testId]); // REMOVED targetCount from dependencies - animation starts once per test, using current targetCount value

  // After animation finishes, sync with live targetCount updates (but don't restart animation)
  useEffect(() => {
    if (countAnimationFinished && targetCount && countAnimationStarted.current) {
      // Only update if animation has already completed (smooth update, no restart)
      setAnimatedCount(targetCount);
      targetCountRef.current = targetCount; // Update ref as well
    }
  }, [countAnimationFinished, targetCount]);

  // 6 bars configuration
  // Each bar: 3 seconds to fill from 0% to 100% (no pauses)
  const BAR_DURATION = 3000; // 3 seconds per bar
  const TOTAL_DURATION = BAR_DURATION * 6; // 18 seconds total
  
  const [barProgresses, setBarProgresses] = useState([0, 0, 0, 0, 0, 0]);
  const [activeBarIndex, setActiveBarIndex] = useState(0);

  // Calculate progress for any bar (simple linear progress, no pauses)
  const calculateBarProgress = (timeInBar: number): number => {
    // Simple linear progress from 0% to 100%
    const progress = Math.min(timeInBar / BAR_DURATION, 1);
    return Math.max(0, Math.min(100, progress * 100));
  };

  // Animate progress with 6 circular bars
  useEffect(() => {
    if (!content || hasCompleted) return;

    const startTime = Date.now();
    const progresses = [0, 0, 0, 0, 0, 0];

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const totalProgress = Math.min(elapsed / TOTAL_DURATION, 1);
      
      // Calculate which bar should be active
      const barIndex = Math.min(Math.floor(elapsed / BAR_DURATION), 5);
      const timeInCurrentBar = elapsed % BAR_DURATION;
      
      // Update all bars
      for (let i = 0; i < 6; i++) {
        if (i < barIndex) {
          // Previous bars are fully filled
          progresses[i] = 100;
        } else if (i === barIndex) {
          // Current bar: calculate simple linear progress (no pauses)
          progresses[i] = calculateBarProgress(timeInCurrentBar);
        } else {
          // Future bars are empty
          progresses[i] = 0;
        }
      }
      
      setBarProgresses([...progresses]);
      setActiveBarIndex(barIndex);
      setProgress(totalProgress * 100);

      if (totalProgress < 1) {
        requestAnimationFrame(animateProgress);
      } else {
        // All bars complete
        setBarProgresses([100, 100, 100, 100, 100, 100]);
        setProgress(100);
        setHasCompleted(true);
        // Immediately call onComplete when reaching 100%
        if (onComplete) {
          onComplete();
        }
      }
    };

    const animationFrame = requestAnimationFrame(animateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, [content, onComplete, hasCompleted]);

  // ✅ Hook'lar conditional return'lardan ÖNCE - React Rules of Hooks
  const baseColor = useMemo(() => {
    if (!content?.colors) {
      return '#6C63FF'; // Fallback
    }
    return extractBaseColor(
      content.colors.progressBar?.fill,
      content.colors.primary?.main,
      '#6C63FF'
    );
  }, [content?.colors?.progressBar?.fill, content?.colors?.primary?.main]);


  // ✅ Şimdi conditional return'lar
  if (loading) {
    return <LoadingFallback testId={testId} />;
  }

  if (error || !content) {
    return <ErrorFallback error={error} testId={testId} />;
  }

  // ✅ Artık content garantili olarak var
  const colors = content.colors;

  const animatedGradients = colors.background.analyzing.animated || [
    colors.background.analyzing.gradient,
    colors.background.analyzing.gradient,
    colors.background.analyzing.gradient,
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background.analyzing.gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '100px 20px 40px' : '120px 40px 60px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background gradient */}
      {animatedGradients.length > 1 && (
        <motion.div
          animate={{
            background: animatedGradients,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
          }}
        />
      )}

      <div style={{
        maxWidth: isMobile ? '100%' : '480px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}>
        {/* "Calculating the Results" text above circles */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: isMobile ? '22px' : '26px',
            marginBottom: isMobile ? '120px' : '80px',
            marginTop: isMobile ? '-20px' : '0px',
            fontWeight: '700',
            color: baseColor,
            textAlign: 'center',
            lineHeight: '1.3',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Calculating the Results
        </motion.h1>

        {/* 6 Circular Progress Bars in Hexagon Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: isMobile ? '100%' : '600px',
            margin: '0 auto',
            marginBottom: '24px',
            padding: isMobile ? '20px' : '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: isMobile ? '400px' : '500px',
            background: 'transparent', // Make container transparent
          }}
        >
          {/* Hexagon container - transparent */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'transparent', // Make container transparent
          }}>
            {/* Hexagon positioned circles */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              background: 'transparent', // Transparent background
            }}>
              {/* "ANALYZING" text in center of hexagon */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{
                    fontSize: isMobile ? '18px' : '22px',
                    fontWeight: '700',
                    color: baseColor,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    whiteSpace: 'nowrap',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>ANALYZING</span>
                  {/* Loading bars animation */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    width: isMobile ? '24px' : '28px',
                    height: isMobile ? '16px' : '18px',
                    gap: '3px',
                  }}>
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        style={{
                          width: isMobile ? '6px' : '7px',
                          height: '100%',
                          backgroundColor: '#E0E0E0',
                          borderRadius: '4px',
                          boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.2)',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '30%',
                            background: `linear-gradient(to top, ${baseColor}, ${baseColor}dd)`,
                            animation: `loadingBar 1.8s infinite`,
                            animationDelay: `${index * 0.2}s`,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
          {['Patterns', 'Signals', 'Tendencies', 'Level', 'Results', 'Personalizing'].map((label, index) => {
            const barProgress = barProgresses[index];
            const isActive = activeBarIndex === index;
            const radius = isMobile ? 58 : 60; // Increased mobile radius from 50 to 58
            const circumference = 2 * Math.PI * radius;
            
            // Hexagon positions (6 points around a circle) - with gap for mobile
            const hexRadius = isMobile ? 170 : 180; // Increased mobile distance to accommodate larger circles
            const angle = (index * 60 - 90) * (Math.PI / 180); // Start from top, 60° apart
            const x = Math.cos(angle) * hexRadius;
            const y = Math.sin(angle) * hexRadius;
            
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Circular Progress Bar */}
                <div style={{ 
                  position: 'relative', 
                  width: isMobile ? '140px' : '140px', // Increased mobile from 120px to 140px
                  height: isMobile ? '140px' : '140px', // Increased mobile from 120px to 140px
                  background: 'transparent',
                }}>
                  {/* Inner wrapper for percentage text */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    transform: 'translateY(30%)',
                    zIndex: 2,
                  }}>
                    <div style={{
                      fontSize: isMobile ? '20px' : '20px', // Increased mobile font size
                      fontWeight: '300',
                      marginTop: '5px',
                      marginBottom: '10px',
                      color: baseColor,
                    }}>
                      {Math.round(barProgress)}%
                    </div>
                  </div>
                  
                  {/* SVG Progress Bar */}
                  <svg
                    className="r-progress-bar"
                    width={isMobile ? 140 : 140} // Increased mobile from 120 to 140
                    height={isMobile ? 140 : 140} // Increased mobile from 120 to 140
                    viewBox="0 0 200 200"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transform: 'rotate(-90deg)',
                    }}
                  >
                    {/* Background circle */}
                    <circle
                      r={radius}
                      cx="100"
                      cy="100"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset="0"
                      stroke={colors.progressBar.background || '#607d8b'}
                      strokeWidth="20"
                      style={{
                        strokeDashoffset: 0,
                      }}
                    />
                    {/* Progress circle */}
                    <circle
                      className="bar"
                      r={radius}
                      cx="100"
                      cy="100"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={((100 - barProgress) / 100) * circumference}
                      stroke={baseColor}
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                
                {/* Label text above circle (curved) - closer to circle and more curved */}
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isMobile ? '150px' : '170px',
                    height: isMobile ? '32px' : '36px',
                  }}
                >
                  <svg
                    width={isMobile ? 150 : 170}
                    height={isMobile ? 32 : 36}
                    style={{
                      overflow: 'visible',
                    }}
                  >
                    <defs>
                      <path
                        id={`arc-path-${index}`}
                        d={`M ${isMobile ? 5 : 8},${isMobile ? 22 : 24} Q ${isMobile ? 75 : 85},${isMobile ? -8 : -10} ${isMobile ? 145 : 162},${isMobile ? 22 : 24}`}
                        fill="none"
                      />
                    </defs>
                    <text
                      fontSize={isMobile ? '12px' : '14px'}
                      fontWeight="700"
                      fill={isActive ? baseColor : '#888'}
                      style={{
                        transition: 'fill 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}
                    >
                      <textPath
                        href={`#arc-path-${index}`}
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        {label}
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            );
          })}
            </div>
          </div>
        </motion.div>

        {/* Today's Tests Completed Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: isMobile ? '8px 12px' : '10px 14px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            marginBottom: '8px',
          }}
        >
          <p style={{
            fontSize: isMobile ? '11px' : '12px',
            color: '#666',
            margin: 0,
            lineHeight: '1.4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            flexWrap: 'wrap',
          }}>
            <span>{language === 'tr' ? 'Bugün' : 'Today'}</span>
            <motion.span
              key={countAnimationFinished ? targetCount : animatedCount}
              initial={{ scale: 1.2, y: -3 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 20,
                duration: 0.3
              }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 20%, #8B5CF6 40%, #FF6B9D 60%, #FFC3D1 80%, #6C63FF 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: isMobile ? '16px' : '18px',
                  lineHeight: '1',
                  display: 'inline-block',
                }}
              >
                {countAnimationFinished ? targetCount.toLocaleString() : animatedCount.toLocaleString()}
              </motion.span>
            </motion.span>
            <span>{language === 'tr' ? 'test tamamlandı!' : "test's completed!"}</span>
          </p>
        </motion.div>

        {/* Trust/Review Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: isMobile ? '-12px 12px' : '-12px 14px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? '3px' : '4px',
          }}
        >
          {/* Excellent Text and Stars - Yan yana */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '6px' : '8px',
            justifyContent: 'center',
          }}>
            {/* Excellent Text */}
            <div style={{
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: '700',
              color: '#4A5568',
              margin: 0,
            }}>
              {language === 'tr' ? 'Mükemmel' : 'Excellent'}
            </div>

            {/* Stars */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const rating = 4.8;
              const filled = star <= Math.floor(rating);
              const partial = star === Math.ceil(rating) && rating % 1 !== 0;
              const fillPercentage = partial ? (rating % 1) * 100 : filled ? 100 : 0;

              return (
                <motion.div
                  key={star}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 8,
                    transition: { duration: 0.2, ease: 'easeOut' }
                  }}
                  style={{
                    position: 'relative',
                    width: isMobile ? '12px' : '14px',
                    height: isMobile ? '12px' : '14px',
                    cursor: 'pointer',
                  }}
                >
                  {/* Background star (unfilled) */}
                  <svg
                    width={isMobile ? '12' : '14'}
                    height={isMobile ? '12' : '14'}
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#E5E7EB"
                      stroke="#E5E7EB"
                      strokeWidth="1"
                    />
                  </svg>
                  {/* Filled star (yellow) */}
                  <svg
                    width={isMobile ? '12' : '14'}
                    height={isMobile ? '12' : '14'}
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      clipPath: partial ? `inset(0 ${100 - fillPercentage}% 0 0)` : 'none',
                    }}
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="#FBBF24"
                      stroke="#F59E0B"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              );
            })}
            </div>
          </div>

          {/* Rating Text */}
          <div style={{
            fontSize: isMobile ? '10px' : '11px',
            color: '#666',
            margin: 0,
            textAlign: 'center',
            lineHeight: '1.3',
          }}>
            <span style={{ fontWeight: '600', color: '#4A5568' }}>4.8</span>{' '}
            {language === 'tr' 
              ? '27 000 değerlendirmeye göre' 
              : 'based on 27 000 reviews'}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

