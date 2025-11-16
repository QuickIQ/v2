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
  const countAnimationStarted = useRef(false);
  const { count: targetCount } = useTestsCompletedCounter();

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

  // Animate count from 1 to target in 2 seconds (only once)
  useEffect(() => {
    if (!content || !targetCount || targetCount <= 0) return;
    if (countAnimationStarted.current) return;

    // Freeze the target count at animation start
    const finalTarget = targetCount;
    countAnimationStarted.current = true;
    setAnimatedCount(1);

    const countDuration = 2000; // 2 seconds
    const countSteps = 60; // 60 steps for smooth animation
    const countIncrement = (finalTarget - 1) / countSteps;
    const countInterval = countDuration / countSteps;

    let currentCount = 1;
    const countTimer = setInterval(() => {
      currentCount += countIncrement;
      if (currentCount >= finalTarget) {
        setAnimatedCount(finalTarget);
        clearInterval(countTimer);
      } else {
        setAnimatedCount(Math.floor(currentCount));
      }
    }, countInterval);

    return () => clearInterval(countTimer);
  }, [content, targetCount]);

  // Animate progress with ease-out
  useEffect(() => {
    if (!content || hasCompleted) return;

    const duration = content.analyzing.duration * 1000; // Convert to milliseconds
    const startTime = Date.now();
    const startProgress = 0;
    const endProgress = 100;

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Ease-out function: easeOutCubic
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const currentProgress = startProgress + (endProgress - startProgress) * easeOut;

      setProgress(currentProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(animateProgress);
      } else {
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
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: isMobile ? '24px' : '28px',
            marginBottom: '12px',
            fontWeight: '700',
            background: colors.button.primary.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            lineHeight: '1.3',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            maxHeight: isMobile ? '64px' : '72px',
          }}
        >
          {analyzing.title[language] || analyzing.title.en}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#555',
            marginBottom: '24px',
            fontWeight: '500',
            lineHeight: '1.5',
            textAlign: 'center',
          }}
        >
          {analyzing.subtitle[language] || analyzing.subtitle.en}
        </motion.p>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: isMobile ? '24px' : '28px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            marginBottom: '16px',
          }}
        >
          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '6px',
            background: colors.progressBar.background,
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: '12px',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: colors.progressBar.fill,
                borderRadius: '3px',
                boxShadow: `0 0 8px ${colors.primary.main}66`,
              }}
            />
          </div>

          {/* Progress Percentage */}
          <div style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: colors.primary.main,
            marginBottom: '12px',
          }}>
            {Math.round(progress)}%
          </div>

          {/* Loading Animation */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              display: 'inline-block',
              fontSize: isMobile ? '32px' : '36px',
              marginTop: '8px',
            }}
          >
            ⚙️
          </motion.div>
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
              key={animatedCount}
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
                {animatedCount.toLocaleString()}
              </motion.span>
            </motion.span>
            <span>{language === 'tr' ? 'test tamamlandı!' : "test's completed!"}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

