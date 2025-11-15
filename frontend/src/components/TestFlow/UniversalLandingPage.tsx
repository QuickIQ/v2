import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { Sparkles } from 'lucide-react';
import { loadTestContent, getTestConfig, TestContent } from '../../utils/testContentLoader';
import * as LucideIcons from 'lucide-react';
import '../../App.css';

interface Props {
  testId: string;
  onStart: () => void;
  iconName?: string;
}

export default function UniversalLandingPage({ testId, onStart, iconName }: Props) {
  const { i18n } = useTranslation();
  const isMobile = useMobile();
  const language = i18n.language as 'en' | 'tr';
  const [content, setContent] = useState<TestContent | null>(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        setError(null);
        console.log(`📦 Loading content for test: ${testId}`);
        const loadedContent = await loadTestContent(testId);
        if (!loadedContent) {
          const errorMsg = `Test content not found for: ${testId}`;
          console.error(`❌ ${errorMsg}`);
          setError(errorMsg);
        } else {
          console.log(`✅ Content loaded successfully for: ${testId}`);
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

  const testConfig = getTestConfig(testId);
  const IconComponent = iconName && (LucideIcons as any)[iconName] 
    ? (LucideIcons as any)[iconName] 
    : LucideIcons.HelpCircle;

  const colors = content.colors;
  const landing = content.landing;
  const questions = content.questions;

  const animatedGradients = colors.background.landing.animated || [
    colors.background.landing.gradient,
    colors.background.landing.gradient,
    colors.background.landing.gradient,
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background.landing.gradient,
      paddingTop: isMobile ? '100px' : '120px',
      paddingBottom: isMobile ? '40px' : '48px',
      paddingLeft: isMobile ? '20px' : '40px',
      paddingRight: isMobile ? '20px' : '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
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
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: isMobile ? '36px' : '48px',
            marginBottom: '16px',
            fontWeight: 'bold',
            background: colors.button.primary.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <IconComponent 
              size={isMobile ? 32 : 40}
              color={colors.primary.main}
              style={{ 
                filter: `drop-shadow(0 0 8px ${colors.primary.main}CC)`,
              }} 
            />
          </motion.div>
          {landing.title[language] || landing.title.en}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: isMobile ? '18px' : '22px',
            color: '#555',
            marginBottom: '32px',
            fontWeight: '500',
            lineHeight: '1.5',
            textAlign: 'center',
          }}
        >
          {landing.subtitle[language] || landing.subtitle.en}
        </motion.p>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: `0 16px 48px ${colors.primary.main}4D, 0 0 40px rgba(255, 255, 255, 0.5)`,
            transition: { duration: 0.15, ease: 'easeOut' }
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: isMobile ? '24px' : '32px',
            borderRadius: '20px',
            marginBottom: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.15s ease-out',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            color: '#555',
            lineHeight: '1.7',
            textAlign: 'center',
            margin: 0,
            marginBottom: '16px',
          }}>
            {landing.description[language] || landing.description.en}
          </p>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#666',
            lineHeight: '1.6',
            textAlign: 'center',
            margin: 0,
            fontStyle: 'italic',
          }}>
            {landing.reminder[language] || landing.reminder.en}
          </p>
        </motion.div>

        {/* Separator with icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            gap: '12px',
          }}
        >
          <div style={{
            flex: 1,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${colors.primary.main}4D, transparent)`,
          }} />
          <Sparkles size={20} style={{ color: colors.primary.main, opacity: 0.6 }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${colors.primary.main}4D, transparent)`,
          }} />
        </motion.div>

        {/* Test Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: isMobile ? '24px' : '32px',
              boxShadow: `0 4px 16px ${colors.primary.main}26`,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              flex: 1,
              maxWidth: isMobile ? '100%' : '200px',
            }}
          >
            <div style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 'bold', color: colors.primary.main, marginBottom: '8px' }}>
              {questions.total}
            </div>
            <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#666', fontWeight: '500' }}>
              {language === 'tr' ? 'Soru' : 'Questions'}
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: isMobile ? '24px' : '32px',
              boxShadow: `0 4px 16px ${colors.primary.main}26`,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              flex: 1,
              maxWidth: isMobile ? '100%' : '200px',
            }}
          >
            <div style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 'bold', color: colors.primary.main, marginBottom: '8px' }}>
              {Math.floor(questions.timeLimit / 60)}
            </div>
            <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#666', fontWeight: '500' }}>
              {language === 'tr' ? 'Dakika' : 'Minutes'}
            </div>
          </motion.div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.7,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          style={{ 
            textAlign: 'center',
          }}
        >
          <motion.button
            onClick={onStart}
            whileHover={{ 
              scale: 1.15,
              y: -8,
              boxShadow: `0 16px 50px ${colors.primary.main}B3, 0 0 60px ${colors.primary.light}99, 0 0 80px ${colors.primary.main}66`,
              transition: { duration: 0.15, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontSize: isMobile ? '18px' : '20px',
              padding: isMobile ? '18px 48px' : '20px 56px',
              background: colors.button.primary.gradient,
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: colors.button.primary.shadow,
              transition: 'all 0.15s ease-out',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            <motion.span
              animate={{
                boxShadow: [
                  `0 0 0 0 ${colors.primary.main}B3`,
                  `0 0 0 10px ${colors.primary.main}00`,
                  `0 0 0 0 ${colors.primary.main}00`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                pointerEvents: 'none',
              }}
            />
            {landing.startButton[language] || landing.startButton.en}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

