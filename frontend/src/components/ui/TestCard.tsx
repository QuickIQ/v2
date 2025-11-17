import { memo, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
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

export const TestCard = memo(function TestCard({ test, index = 0 }: TestCardProps) {
  const { i18n } = useTranslation();
  const isMobile = useMobile();
  const language = i18n.language as 'en' | 'tr';
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false); // useRef kullan - layout değişikliklerinde korunur
  const [hasAnimated, setHasAnimated] = useState(isMobile);
  
  // Mobilde animasyon yok - direkt görünür, desktop'ta useInView ile kontrol et
  const isInView = useInView(ref, { once: true, margin: '0px', amount: 0.1 });
  
  // isMobile değiştiğinde hasAnimated'i güncelle - layout değişikliklerinde animasyon tekrarı önle
  useEffect(() => {
    if (isMobile) {
      // Mobilde animasyon yok, direkt true yap
      setHasAnimated(true);
      hasAnimatedRef.current = true;
    } else if (!hasAnimatedRef.current) {
      // Desktop'a geçildiğinde, eğer daha önce animasyon geçirmediyse resetle
      setHasAnimated(false);
    }
  }, [isMobile]);
  
  // Animasyonu sadece desktop'ta çalıştır - mobilde animasyon yok
  useEffect(() => {
    if (isMobile) return; // Mobilde animasyon yok
    if (isInView && !hasAnimated && !hasAnimatedRef.current) {
      // requestAnimationFrame ile smooth scroll sırasında animasyonu tetikle
      const rafId = requestAnimationFrame(() => {
        setHasAnimated(true);
        hasAnimatedRef.current = true; // Kalıcı olarak işaretle
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [isInView, hasAnimated, isMobile]);
  
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
        ref={ref}
        className={`${test.id}-test-card`}
        layout={false}
        initial={false}
        animate={isMobile ? { opacity: 1, y: 0 } : (hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
        transition={isMobile ? { duration: 0 } : (hasAnimated ? { duration: 0.5, delay: index * 0.1 } : { duration: 0 })}
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
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        whileHover={isMobile ? {} : {
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
        {/* Glow Effect Background - Sadece desktop'ta */}
        {!isMobile && (
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
        )}
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 100, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, boxSizing: 'border-box', overflow: 'visible', isolation: 'isolate', pointerEvents: 'auto' }}>
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
                // Mobilde statik icon - animasyon yok
                <IconComponent
                  size={28}
                  style={{
                    color: test.colors.primary,
                  }}
                />
              ) : (
                // Desktop'ta animasyonlu icon
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
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <IconComponent
                    size={34}
                    style={{
                      color: test.colors.primary,
                      filter: `drop-shadow(0 0 8px ${test.colors.primary}80)`,
                    }}
                  />
                </motion.div>
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
              boxShadow: isMobile 
                ? `0 2px 8px ${test.colors.primary}33` 
                : `0 4px 16px ${test.colors.primary}4D`,
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
            whileHover={isMobile ? {} : { 
              scale: 1.05,
              boxShadow: `0 6px 20px ${test.colors.primary}66`,
            }}
            whileTap={isMobile ? {} : { scale: 0.98 }}
          >
            {language === 'tr' ? 'Teste Başla' : 'Start Test'}
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}, (prevProps, nextProps) => {
  // React.memo: true döndürürse re-render'ı SKIP eder, false döndürürse re-render yapar
  // Tüm test özelliklerini karşılaştır - sadece ID değil, tüm render'ı etkileyen özellikler
  const prev = prevProps.test;
  const next = nextProps.test;
  
  // Index değiştiyse re-render yap
  if (prevProps.index !== nextProps.index) {
    return false;
  }
  
  // Test objesi referansı aynıysa skip et (en hızlı kontrol)
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
      return false; // Biri var biri yok
    }
    if (prevSubtitle.en !== nextSubtitle.en || prevSubtitle.tr !== nextSubtitle.tr) {
      return false;
    }
  }
  
  // Colors objesi değiştiyse re-render yap - sadece kritik renkleri kontrol et (performans için)
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

