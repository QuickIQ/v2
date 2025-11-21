import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { Sparkles, BookOpen, Clock } from 'lucide-react';
import { loadTestContent, getTestConfig, TestContent } from '../../utils/testContentLoader';
import * as LucideIcons from 'lucide-react';
import { LoadingFallback } from '../ui/LoadingFallback';
import { ErrorFallback } from '../ui/ErrorFallback';
import '../../App.css';

// Import landing images
import creativeThinkingImage from '../../assets/images/landing/creative-thinking.svg';

// Landing images mapping
const landingImages: Record<string, string> = {
  'creative-thinking': creativeThinkingImage,
};

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
  const [landingImage, setLandingImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load landing image
  useEffect(() => {
    const image = landingImages[testId];
    if (image) {
      setLandingImage(image);
    } else {
      setLandingImage(null);
    }
  }, [testId]);

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

  if (loading) {
    return <LoadingFallback testId={testId} />;
  }

  if (error || !content) {
    return <ErrorFallback error={error} testId={testId} />;
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
            marginBottom: '10px',
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
          {testConfig?.name?.[language] || testConfig?.name?.en || testId}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: isMobile ? '18px' : '22px',
            color: '#555',
            marginBottom: '8px',
            fontWeight: '500',
            lineHeight: '1.5',
            textAlign: 'center',
          }}
        >
          {language === 'tr' 
            ? 'Dürüst cevap verin, bu test yargılamak için değil, kendinizi keşfetmeniz içindir.'
            : 'Answer honestly, this test is for your self-discovery, not for judgment.'}
        </motion.p>

        {/* Reminder - below subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            fontSize: isMobile ? '13px' : '15px',
            color: '#666',
            marginBottom: '32px',
            lineHeight: '1.5',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {landing.reminder[language] || landing.reminder.en}
        </motion.p>

        {/* Landing Image - SVG */}
        {landingImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={landingImage}
              alt={`${testId} landing illustration`}
              style={{
                maxWidth: isMobile ? '280px' : '400px',
                width: '100%',
                height: 'auto',
                filter: `drop-shadow(0 8px 16px ${colors.primary.main}33)`,
              }}
            />
          </motion.div>
        )}

        {/* Separator with icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: landingImage ? 0.6 : 0.4 }}
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
          transition={{ duration: 0.8, delay: landingImage ? 0.8 : 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: isMobile ? '10px' : '16px',
            marginBottom: '10px',
          }}
        >
          <motion.div
            whileHover={isMobile ? {} : { scale: 1.05, y: -3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: isMobile ? '12px 16px' : '16px 22px',
              boxShadow: `0 2px 12px ${colors.primary.main}20, 0 0 0 1px ${colors.primary.main}15`,
              border: `1px solid ${colors.primary.main}20`,
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '6px' : '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ 
              fontSize: isMobile ? '20px' : '26px', 
              fontWeight: '700', 
              color: colors.primary.main, 
              lineHeight: '1',
            }}>
              {questions.total}
            </span>
            <span style={{ 
              fontSize: isMobile ? '11px' : '13px', 
              color: '#666', 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {language === 'tr' ? 'Soru' : 'Questions'}
            </span>
            <BookOpen 
              size={isMobile ? 14 : 16} 
              style={{ 
                color: colors.primary.main,
                opacity: 0.6,
                flexShrink: 0,
                marginLeft: '2px',
              }} 
            />
          </motion.div>
          <motion.div
            whileHover={isMobile ? {} : { scale: 1.05, y: -3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: isMobile ? '12px 16px' : '16px 22px',
              boxShadow: `0 2px 12px ${colors.primary.main}20, 0 0 0 1px ${colors.primary.main}15`,
              border: `1px solid ${colors.primary.main}20`,
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '6px' : '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <span style={{ 
              fontSize: isMobile ? '20px' : '26px', 
              fontWeight: '700', 
              color: colors.primary.main, 
              lineHeight: '1',
            }}>
              {Math.floor(questions.timeLimit / 60)}
            </span>
            <span style={{ 
              fontSize: isMobile ? '11px' : '13px', 
              color: '#666', 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {language === 'tr' ? 'Dakika' : 'Minutes'}
            </span>
            <Clock 
              size={isMobile ? 14 : 16} 
              style={{ 
                color: colors.primary.main,
                opacity: 0.6,
                flexShrink: 0,
                marginLeft: '2px',
              }} 
            />
          </motion.div>
        </motion.div>

        {/* Privacy Notice - above button */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: landingImage ? 0.95 : 0.65 }}
          style={{
            fontSize: isMobile ? '12px' : '13px',
            color: '#666',
            marginBottom: '8px',
            textAlign: 'center',
            lineHeight: '1.4',
          }}
        >
          {language === 'tr' 
            ? 'Cevaplarınız saklanmaz veya paylaşılmaz.'
            : 'Your responses are not stored or shared.'}
        </motion.p>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: landingImage ? 1.0 : 0.7,
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
            {language === 'tr' ? 'Devam Et' : 'Continue'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

