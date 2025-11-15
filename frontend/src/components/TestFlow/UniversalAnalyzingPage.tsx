import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { loadTestContent, TestContent } from '../../utils/testContentLoader';
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

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        setError(null);
        console.log(`📦 Loading analyzing content for test: ${testId}`);
        const loadedContent = await loadTestContent(testId);
        if (!loadedContent) {
          const errorMsg = `Test content not found for: ${testId}`;
          console.error(`❌ ${errorMsg}`);
          setError(errorMsg);
        } else {
          console.log(`✅ Analyzing content loaded successfully for: ${testId}`);
          setContent(loadedContent);
        }
      } catch (err: any) {
        const errorMsg = `Failed to load content for ${testId}: ${err.message || err}`;
        console.error(`❌ ${errorMsg}`, err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [testId]);

  useEffect(() => {
    if (!content) return;

    const duration = content.analyzing.duration * 1000; // Convert to milliseconds
    const interval = 100; // Update every 100ms
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 500);
          }
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [content, onComplete]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#6c63ff' }}>
          Loading...
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
        padding: '40px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '24px', color: '#ff4444', marginBottom: '16px' }}>
          ⚠️ Content Loading Error
        </div>
        <div style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
          Test ID: <strong>{testId}</strong>
        </div>
        {error && (
          <div style={{ fontSize: '14px', color: '#888', maxWidth: '600px' }}>
            {error}
          </div>
        )}
        <div style={{ fontSize: '14px', color: '#888', marginTop: '16px' }}>
          Please check the browser console for more details.
        </div>
      </div>
    );
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
      padding: isMobile ? '20px' : '40px',
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
        maxWidth: '600px',
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
            fontSize: isMobile ? '32px' : '42px',
            marginBottom: '16px',
            fontWeight: 'bold',
            background: colors.button.primary.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
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
            fontSize: isMobile ? '16px' : '20px',
            color: '#555',
            marginBottom: '40px',
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
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: isMobile ? '32px' : '48px',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            marginBottom: '24px',
          }}
        >
          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: colors.progressBar.background,
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '16px',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
              style={{
                height: '100%',
                background: colors.progressBar.fill,
                borderRadius: '4px',
                boxShadow: `0 0 10px ${colors.primary.main}66`,
              }}
            />
          </div>

          {/* Progress Percentage */}
          <div style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: 'bold',
            color: colors.primary.main,
            marginBottom: '8px',
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
              fontSize: '48px',
              marginTop: '16px',
            }}
          >
            ⚙️
          </motion.div>
        </motion.div>

        {/* Trust Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: isMobile ? '20px' : '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <p style={{
            fontSize: isMobile ? '13px' : '15px',
            color: '#666',
            margin: 0,
            lineHeight: '1.5',
          }}>
            {language === 'tr' 
              ? 'Sonuçlarınız hazırlanıyor... Lütfen bekleyin.' 
              : 'Your results are being prepared... Please wait.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

