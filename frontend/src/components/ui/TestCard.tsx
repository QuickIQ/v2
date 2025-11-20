import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMobile } from '../../hooks/useMobile';
import { Clock, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import './TestCard.css';

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

export const TestCard = memo(function TestCard({ test, index = 0 }: TestCardProps) {
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
    ? (isIQTest ? '18px' : (isTwoWords ? '14px' : '20px'))
    : 'clamp(16px, 2vw, 26px)';

  return (
    <Link
      to={`/test/${test.slug}`}
      className="test-card-link"
      style={{ 
        textDecoration: 'none', 
        color: 'inherit', 
        display: 'block',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className={`test-card test-card-fade-in ${test.id}-test-card`}
        style={{
          background: test.colors.cardBackground,
          borderRadius: isMobile ? '16px' : '24px',
          padding: isMobile ? '24px' : '32px',
          border: `2px solid ${test.colors.cardBorder}`,
          animationDelay: `${index * 0.1}s`,
          '--card-glow': test.colors.cardGlow,
          '--card-shadow': test.colors.cardShadow,
          '--card-hover-border': test.colors.cardHoverBorder,
          '--button-shadow': `${test.colors.primary}66`,
        } as React.CSSProperties & { '--card-glow': string; '--card-hover-border': string; '--button-shadow': string }}
      >
        {/* Glow Effect Background - Desktop only */}
        {!isMobile && (
          <div
            className="test-card-glow"
            style={{
              '--card-glow': test.colors.cardGlow,
            } as React.CSSProperties}
          />
        )}
        
        {/* Content */}
        <div style={{ 
          position: 'relative', 
          zIndex: 100, 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          minHeight: 0, 
          boxSizing: 'border-box', 
          overflow: 'visible', 
          isolation: 'isolate', 
          pointerEvents: 'auto' 
        }}>
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
              {isMobile ? (
                // Mobile: static icon
                <IconComponent
                  size={28}
                  style={{
                    color: test.colors.primary,
                  }}
                />
              ) : (
                // Desktop: animated icon
                <div 
                  className="test-card-icon-animated"
                  style={{
                    '--card-glow': test.colors.cardGlow,
                  } as React.CSSProperties}
                >
                  <IconComponent
                    size={34}
                    style={{
                      color: test.colors.primary,
                      filter: `drop-shadow(0 0 8px ${test.colors.primary}80)`,
                    }}
                  />
                </div>
              )}
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
          <button
            className="test-card-button"
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
              boxShadow: isMobile 
                ? `0 2px 8px ${test.colors.primary}33` 
                : `0 4px 12px ${test.colors.primary}40`,
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
              '--button-shadow': `${test.colors.primary}66`,
            } as React.CSSProperties}
          >
            {language === 'tr' ? 'Teste Başla' : 'Start Test'}
          </button>
        </div>
      </div>
    </Link>
  );
}, (prevProps, nextProps) => {
  // React.memo: true döndürürse re-render'ı SKIP eder, false döndürürse re-render yapar
  const prev = prevProps.test;
  const next = nextProps.test;
  
  // Index değiştiyse re-render yap
  if (prevProps.index !== nextProps.index) {
    return false;
  }
  
  // Test objesi referansı aynıysa skip et
  if (prev === next) {
    return true;
  }
  
  // Temel özellikler değiştiyse re-render yap
  if (prev.id !== next.id ||
      prev.slug !== next.slug ||
      prev.category !== next.category ||
      prev.icon !== next.icon ||
      prev.questions !== next.questions ||
      prev.minutes !== next.minutes) {
    return false;
  }
  
  // Name objesi değiştiyse re-render yap
  if (prev.name.en !== next.name.en || prev.name.tr !== next.name.tr) {
    return false;
  }
  
  // Subtitle değiştiyse re-render yap
  const prevSubtitle = prev.subtitle;
  const nextSubtitle = next.subtitle;
  if (prevSubtitle !== nextSubtitle) {
    if (!prevSubtitle || !nextSubtitle) {
      return false;
    }
    if (prevSubtitle.en !== nextSubtitle.en || prevSubtitle.tr !== nextSubtitle.tr) {
      return false;
    }
  }
  
  // Colors objesi değiştiyse re-render yap
  const prevColors = prev.colors;
  const nextColors = next.colors;
  if (prevColors.primary !== nextColors.primary ||
      prevColors.cardBackground !== nextColors.cardBackground ||
      prevColors.cardBorder !== nextColors.cardBorder ||
      prevColors.cardHoverBorder !== nextColors.cardHoverBorder ||
      prevColors.cardGlow !== nextColors.cardGlow ||
      prevColors.cardShadow !== nextColors.cardShadow ||
      prevColors.buttonGradient !== nextColors.buttonGradient) {
    return false;
  }
  
  // Tüm özellikler aynıysa re-render'ı skip et
  return true;
});
