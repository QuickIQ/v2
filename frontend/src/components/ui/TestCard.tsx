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

  return (
    <Link
      to={`/test/${test.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', aspectRatio: '1.295' }}
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
          overflow: 'hidden',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
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
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          <div style={{ marginBottom: '24px', flexShrink: 0, minHeight: subtitle ? undefined : (isMobile ? '39px' : '45px') }}>
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
              height: isMobile ? '34px' : '42px',
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
                fontSize: isMobile ? '22px' : '26px',
                color: test.colors.primary,
                whiteSpace: 'nowrap',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                lineHeight: isMobile ? '22px' : '26px',
                height: isMobile ? '22px' : '26px',
              }}>
                {testName}
              </h4>
            </div>
            <p style={{ 
              color: '#666', 
              fontSize: isMobile ? '14px' : '16px', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '6px' : '8px',
              flexWrap: 'wrap',
              marginBottom: '8px',
              marginTop: '8px',
              height: isMobile ? '20px' : '22px',
              lineHeight: isMobile ? '14px' : '16px',
            }}>
              <HelpCircle size={isMobile ? 16 : 18} style={{ color: test.colors.primary, flexShrink: 0 }} />
              <span>{test.questions} {language === 'tr' ? 'soru' : 'questions'}</span>
              <span style={{ margin: '0 4px' }}>-</span>
              <Clock size={isMobile ? 16 : 18} style={{ color: test.colors.primary, flexShrink: 0 }} />
              <span>{test.minutes} {language === 'tr' ? 'dakika' : 'minutes'}</span>
            </p>
            {subtitle ? (
              <p style={{ 
                color: '#666', 
                fontSize: isMobile ? '13px' : '15px', 
                lineHeight: '1.5',
                marginTop: '8px',
                marginBottom: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                minHeight: isMobile ? '39px' : '45px',
                maxHeight: isMobile ? '39px' : '45px',
              }}>
                {subtitle}
              </p>
            ) : (
              <div style={{ 
                marginTop: '8px',
                marginBottom: '16px',
                minHeight: isMobile ? '39px' : '45px',
                maxHeight: isMobile ? '39px' : '45px',
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
              height: isMobile ? '40px' : '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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

