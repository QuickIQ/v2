import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMobile } from '../../hooks/useMobile';
import { Clock, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface TestConfig {
  id: string;
  slug: string;
  name: {
    en: string;
    tr: string;
  };
  category: string;
  icon: string;
  iconEmoji: string;
  questions: number;
  minutes: number;
  colors: {
    primary: string;
    light: string;
    cardBackground: string;
    cardBorder: string;
    cardHoverBorder: string;
    cardGlow: string;
    cardShadow: string;
    buttonGradient: string;
    titleGradient: string;
  };
  subtitle?: {
    en: string;
    tr: string;
  };
}

interface TestCardProps {
  test: TestConfig;
  index?: number;
}

export function TestCard({ test, index = 0 }: TestCardProps) {
  const { i18n } = useTranslation();
  const isMobile = useMobile();
  const language = i18n.language as 'en' | 'tr';
  
  // Get icon component dynamically
  const IconComponent = (LucideIcons as any)[test.icon] || LucideIcons.HelpCircle;
  
  const testName = test.name[language] || test.name.en;
  const subtitle = test.subtitle?.[language] || test.subtitle?.en || '';

  // Count words in title to adjust font size for mobile
  const wordCount = testName.trim().split(/\s+/).length;
  const isTwoWords = wordCount === 2;
  
  // Special case for IQ TEST - larger font size on mobile
  const isIQTest = test.id === 'iqtest' || test.slug === 'iqtest';
  
  // Adjust font size based on word count for mobile
  const titleFontSize = isMobile
    ? (isIQTest ? '18px' : (isTwoWords ? '14px' : '20px')) // IQ TEST: 18px, Two words: 14px, Single word: 20px on mobile
    : 'clamp(16px, 2vw, 26px)'; // Desktop uses responsive sizing

  return (
    <Link
      to={`/test/${test.slug}`}
      style={{ 
        textDecoration: 'none', 
        color: 'inherit', 
        display: 'block',
        width: '100%',
        height: '100%',
      }}
    >
      <motion.div
        className={`${test.id}-test-card`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{
          cursor: 'pointer',
          background: test.colors.cardBackground,
          borderRadius: isMobile ? '16px' : '24px',
          padding: isMobile ? '24px' : '32px',
          border: `2px solid ${test.colors.cardBorder}`,
          position: 'relative',
          overflow: 'visible',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          transformOrigin: 'center center',
        }}
        whileHover={{
          y: -15,
          scale: 1.05,
          boxShadow: test.colors.cardShadow,
          borderColor: test.colors.cardHoverBorder,
          transition: {
            duration: 0.25,
            ease: [0.34, 1.56, 0.64, 1],
          },
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        {/* Glow Effect Background */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle, ${test.colors.cardGlow} 0%, transparent 70%)`,
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -10,
            willChange: 'opacity',
          }}
          transition={{ 
            duration: 0.2,
            ease: 'easeOut',
          }}
          whileHover={{ 
            opacity: 1,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          }}
        />
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 100, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, boxSizing: 'border-box', overflow: 'visible', isolation: 'isolate', pointerEvents: 'auto', willChange: 'transform' }}>
          <div style={{ marginBottom: isMobile ? '12px' : '16px', flexShrink: 0, flexGrow: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              minWidth: 0,
              width: '100%',
              minHeight: isMobile ? '34px' : '42px',
              overflow: 'visible',
            }}>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                <IconComponent
                  size={isMobile ? 28 : 34}
                  style={{
                    color: test.colors.primary,
                    filter: `drop-shadow(0 0 8px ${test.colors.primary}80)`,
                  }}
                />
              </motion.div>
              <h4 style={{
                fontWeight: '600',
                fontSize: titleFontSize,
                color: test.colors.primary,
                whiteSpace: 'nowrap',
                margin: 0,
                overflow: 'visible',
                textOverflow: 'clip',
                maxWidth: '100%',
                minWidth: 0,
                lineHeight: isMobile ? '1.2' : '1.2',
                flex: '1 1 auto',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                position: 'relative',
                zIndex: 101,
              }}>
                {testName}
              </h4>
            </div>
            <p style={{ 
              color: '#666', 
              fontSize: isMobile ? '11px' : '16px', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '3px' : '8px',
              flexWrap: 'nowrap',
              marginBottom: isMobile ? '6px' : '8px',
              marginTop: isMobile ? '6px' : '8px',
              height: isMobile ? '18px' : '22px',
              lineHeight: isMobile ? '11px' : '16px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              minWidth: 0,
              textAlign: 'center',
            }}>
              <HelpCircle size={isMobile ? 12 : 18} style={{ color: test.colors.primary, flexShrink: 0 }} />
              <span style={{ flexShrink: 0 }}>{test.questions} {language === 'tr' ? 'soru' : 'questions'}</span>
              <span style={{ margin: '0 2px', flexShrink: 0 }}>-</span>
              <Clock size={isMobile ? 12 : 18} style={{ color: test.colors.primary, flexShrink: 0 }} />
              <span style={{ flexShrink: 0 }}>{test.minutes} {language === 'tr' ? 'dakika' : 'minutes'}</span>
            </p>
            {subtitle ? (
              <p style={{ 
                color: '#666', 
                fontSize: isMobile ? '11px' : '15px', 
                lineHeight: '1.4',
                marginTop: isMobile ? '8px' : '8px',
                marginBottom: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                flexShrink: 0,
                flexGrow: 1,
                textAlign: 'center',
                padding: '0 2px',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                minHeight: isMobile ? '29px' : '45px',
              }}>
                {subtitle}
              </p>
            ) : (
              <div style={{ 
                marginTop: isMobile ? '8px' : '8px',
                marginBottom: 0,
                minHeight: isMobile ? '29px' : '45px',
                flexShrink: 0,
                flexGrow: 1,
              }} />
            )}
          </div>
          
          {/* Start Button */}
          <motion.button
            style={{
              marginTop: 'auto',
              padding: isMobile ? '12px 20px' : '14px 24px',
              background: test.colors.buttonGradient,
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '600',
              fontSize: isMobile ? '14px' : '16px',
              cursor: 'pointer',
              boxShadow: `0 4px 16px ${test.colors.primary}4D`,
              transition: 'all 0.15s ease-out',
              width: 'fit-content',
              alignSelf: 'center',
              flexShrink: 0,
              flexGrow: 0,
              height: isMobile ? '40px' : '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: isMobile ? '40px' : '48px',
              position: 'relative',
              zIndex: 101,
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 6px 20px ${test.colors.primary}66`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {language === 'tr' ? 'Teste Başla' : 'Start Test'}
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}

