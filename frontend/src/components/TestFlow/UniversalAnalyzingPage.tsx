import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { loadTestContent, TestContent } from '../../utils/testContentLoader';
import { LoadingFallback } from '../ui/LoadingFallback';
import { ErrorFallback } from '../ui/ErrorFallback';
import { useTestsCompletedCounter } from '../../hooks/useTestsCompletedCounter';
import '../../App.css';

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
  const [progress, setProgress] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(1);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [countAnimationFinished, setCountAnimationFinished] = useState(false);
  const countAnimationStarted = useRef(false);
  const { count: targetCount, formattedCount } = useTestsCompletedCounter();
  const targetCountRef = useRef(targetCount);

  // Update ref whenever targetCount changes (but don't restart animation)
  useEffect(() => {
    targetCountRef.current = targetCount;
    // If animation already finished, just update the displayed count
    if (countAnimationFinished) {
      setAnimatedCount(targetCount);
    }
  }, [targetCount, countAnimationFinished]);

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
  // Each bar: 4 seconds total (1.5s active + 2.5s pause)
  const BAR_DURATION = 4000; // 4 seconds per bar
  const ACTIVE_TIME = 1500; // 1.5 seconds active animation
  const TOTAL_PAUSE_TIME = 2500; // 2.5 seconds total pause time
  const TOTAL_DURATION = BAR_DURATION * 6; // 24 seconds total
  
  // Generate random milestones for each bar
  const generateRandomMilestones = (): Array<{ progress: number; pause: number }> => {
    const milestones: Array<{ progress: number; pause: number }> = [];
    const pauseOptions = [200, 250, 300, 350, 400]; // Possible pause durations
    let totalPause = 0;
    let lastProgress = 1;
    
    // Generate 6-10 random milestones
    const numMilestones = 6 + Math.floor(Math.random() * 5);
    
    while (totalPause < TOTAL_PAUSE_TIME && lastProgress < 99) {
      const progress = lastProgress + Math.random() * (99 - lastProgress) * 0.3; // Random progress between last and 99
      const pause = pauseOptions[Math.floor(Math.random() * pauseOptions.length)];
      
      if (totalPause + pause <= TOTAL_PAUSE_TIME) {
        milestones.push({ progress: Math.min(progress, 98), pause });
        totalPause += pause;
        lastProgress = progress;
      } else {
        // Add remaining pause time to last milestone if needed
        if (milestones.length > 0) {
          milestones[milestones.length - 1].pause += TOTAL_PAUSE_TIME - totalPause;
        }
        break;
      }
    }
    
    return milestones.sort((a, b) => a.progress - b.progress);
  };
  
  // Generate milestones for each bar (memoized per testId)
  const [barMilestones] = useState(() => [
    generateRandomMilestones(),
    generateRandomMilestones(),
    generateRandomMilestones(),
    generateRandomMilestones(),
    generateRandomMilestones(),
    generateRandomMilestones(),
  ]);
  
  const [barProgresses, setBarProgresses] = useState([0, 0, 0, 0, 0, 0]);
  const [activeBarIndex, setActiveBarIndex] = useState(0);

  // Calculate progress for any bar with milestones
  const calculateBarProgress = (timeInBar: number, milestones: Array<{ progress: number; pause: number }>): number => {
    let adjustedTime = timeInBar;
    let totalPauseSoFar = 0;
    
    // Calculate how much pause time has passed
    for (let i = 0; i < milestones.length; i++) {
      const milestone = milestones[i];
      const progressAtMilestone = (milestone.progress / 100) * ACTIVE_TIME;
      const pauseTimeBeforeMilestone = milestones.slice(0, i).reduce((sum, m) => sum + m.pause, 0);
      const timeToReachMilestone = progressAtMilestone + pauseTimeBeforeMilestone;
      
      if (timeInBar >= timeToReachMilestone) {
        const pauseEndTime = timeToReachMilestone + milestone.pause;
        if (timeInBar < pauseEndTime) {
          // We're paused at this milestone - return milestone progress
          return milestone.progress;
        } else {
          // Past this milestone, add its pause time
          totalPauseSoFar += milestone.pause;
        }
      } else {
        break;
      }
    }
    
    // Adjust time by subtracting accumulated pause time
    adjustedTime = timeInBar - totalPauseSoFar;
    
    // Calculate progress (1% to 100%)
    const progress = Math.min(adjustedTime / ACTIVE_TIME, 1);
    const progressPercent = Math.max(1, Math.min(100, 1 + (progress * 99)));
    
    return progressPercent;
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
          // Current bar: calculate with milestones
          progresses[i] = calculateBarProgress(timeInCurrentBar, barMilestones[i]);
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

  if (loading) {
    return <LoadingFallback testId={testId} />;
  }

  if (error || !content) {
    return <ErrorFallback error={error} testId={testId} />;
  }

  const colors = content.colors;
  const analyzing = content.analyzing;

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
            marginBottom: isMobile ? '60px' : '80px',
            fontWeight: '700',
            color: colors.primary.main || '#6C63FF',
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
          {['Patterns', 'Signals', 'Tendencies', 'Level', 'Results', 'Personalizing'].map((label, index) => {
            const barProgress = barProgresses[index];
            const isActive = activeBarIndex === index;
            const radius = isMobile ? 50 : 60;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (barProgress / 100) * circumference;
            
            // Hexagon positions (6 points around a circle) - with gap for mobile
            const hexRadius = isMobile ? 160 : 180; // Distance from center (increased for gap)
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
                  width: isMobile ? '120px' : '140px', 
                  height: isMobile ? '120px' : '140px',
                  background: 'transparent', // Transparent background
                }}>
                  <svg
                    width={isMobile ? 120 : 140}
                    height={isMobile ? 120 : 140}
                    style={{
                      transform: 'rotate(-90deg)',
                    }}
                  >
                    <defs>
                      {/* Gradient for progress stroke - smooth, flowing effect */}
                      <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colors.progressBar.fill || colors.primary.main || '#6C63FF'} stopOpacity="1" />
                        <stop offset="12.5%" stopColor={colors.primary.main || '#7B7FFF'} stopOpacity="0.95" />
                        <stop offset="25%" stopColor={colors.progressBar.fill || colors.primary.main || '#8B9FFF'} stopOpacity="0.9" />
                        <stop offset="37.5%" stopColor={colors.progressBar.fill || colors.primary.main || '#9bc9ed'} stopOpacity="0.85" />
                        <stop offset="50%" stopColor={colors.progressBar.fill || colors.primary.main || '#A8D5F0'} stopOpacity="0.8" />
                        <stop offset="62.5%" stopColor={colors.progressBar.fill || colors.primary.main || '#B0D5F0'} stopOpacity="0.75" />
                        <stop offset="75%" stopColor={colors.progressBar.fill || colors.primary.main || '#B8D8F2'} stopOpacity="0.7" />
                        <stop offset="87.5%" stopColor={colors.progressBar.fill || colors.primary.main || '#C0DCF5'} stopOpacity="0.65" />
                        <stop offset="100%" stopColor={colors.progressBar.fill || colors.primary.main || '#C8E0F5'} stopOpacity="0.6" />
                      </linearGradient>
                      {/* Glow filter for active bar */}
                      <filter id={`glow-${index}`}>
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      {/* Radial gradient for soft glow */}
                      <radialGradient id={`radial-glow-${index}`} cx="50%" cy="50%">
                        <stop offset="0%" stopColor={colors.progressBar.fill || colors.primary.main || '#6C63FF'} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={colors.progressBar.fill || colors.primary.main || '#6C63FF'} stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    {/* Background circle */}
                    <circle
                      cx={isMobile ? 60 : 70}
                      cy={isMobile ? 60 : 70}
                      r={radius}
                      fill="none"
                      stroke={colors.progressBar.background || '#E5E7EB'}
                      strokeWidth="12"
                      opacity="0.3"
                    />
                    {/* Outer glow circle (soft, animated) */}
                    {isActive && barProgress > 0 && (
                      <motion.circle
                        cx={isMobile ? 60 : 70}
                        cy={isMobile ? 60 : 70}
                        r={radius + 3}
                        fill="none"
                        stroke={colors.progressBar.fill || colors.primary.main || '#6C63FF'}
                        strokeWidth="3"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference, opacity: 0 }}
                        animate={{ 
                          strokeDashoffset,
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ 
                          strokeDashoffset: { duration: 0.1, ease: 'easeOut' },
                          opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                        }}
                        style={{
                          filter: `blur(6px)`,
                        }}
                      />
                    )}
                    {/* Main progress circle with gradient - the beam effect */}
                    <motion.circle
                      cx={isMobile ? 60 : 70}
                      cy={isMobile ? 60 : 70}
                      r={radius}
                      fill="none"
                      stroke={`url(#gradient-${index})`}
                      strokeWidth="14"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 0.1, ease: 'easeOut' }}
                      style={{
                        filter: isActive && barProgress > 0 
                          ? `drop-shadow(0 0 16px ${colors.primary.main || '#6C63FF'}AA) drop-shadow(0 0 8px ${colors.primary.main || '#6C63FF'}66)` 
                          : 'none',
                      }}
                    />
                    {/* Animated beam trail - moving light effect */}
                    {isActive && barProgress > 2 && (
                      <motion.circle
                        cx={isMobile ? 60 : 70}
                        cy={isMobile ? 60 : 70}
                        r={radius}
                        fill="none"
                        stroke={colors.progressBar.fill || colors.primary.main || '#6C63FF'}
                        strokeWidth="16"
                        strokeDasharray={`${circumference * 0.08} ${circumference}`}
                        strokeDashoffset={strokeDashoffset - (circumference * 0.04)}
                        strokeLinecap="round"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: [0.8, 1, 0.8],
                          strokeDashoffset: strokeDashoffset - (circumference * 0.04),
                        }}
                        transition={{ 
                          opacity: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
                          strokeDashoffset: { duration: 0.1, ease: 'easeOut' }
                        }}
                        style={{
                          filter: `blur(2px)`,
                        }}
                      />
                    )}
                  </svg>
                  {/* Percentage text in center - always perfectly centered, never moves */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: isMobile ? '18px' : '20px',
                      fontWeight: '700',
                      color: colors.primary.main || '#6C63FF',
                      textAlign: 'center',
                      lineHeight: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 'auto',
                      height: 'auto',
                      margin: 0,
                      padding: 0,
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {Math.round(barProgress)}%
                  </div>
                </div>
                
                {/* Label text above circle (curved) - closer to circle and more curved */}
                <div
                  style={{
                    position: 'absolute',
                    top: isMobile ? '-12px' : '-16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isMobile ? '150px' : '170px',
                    height: isMobile ? '35px' : '40px',
                  }}
                >
                  <svg
                    width={isMobile ? 150 : 170}
                    height={isMobile ? 35 : 40}
                    style={{
                      overflow: 'visible',
                    }}
                  >
                    <defs>
                      <path
                        id={`arc-path-${index}`}
                        d={`M ${isMobile ? 5 : 8},${isMobile ? 25 : 28} A ${isMobile ? 70 : 80},${isMobile ? 30 : 35} 0 0,1 ${isMobile ? 145 : 162},${isMobile ? 25 : 28}`}
                        fill="none"
                      />
                    </defs>
                    <text
                      fontSize={isMobile ? '12px' : '14px'}
                      fontWeight="700"
                      fill={isActive ? colors.primary.main || '#6C63FF' : '#888'}
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
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: isMobile ? '16px' : '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
          <p style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#666',
            margin: 0,
            lineHeight: '1.5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
            gap: '6px',
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
                  fontSize: isMobile ? '20px' : '24px',
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
      </div>
    </div>
  );
}

