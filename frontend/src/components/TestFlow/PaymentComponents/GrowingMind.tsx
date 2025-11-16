import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '../../../hooks/useMobile';
import paymentPageContent from '../../../data/shared/payment-page-content.json';

interface GrowingMindProps {
  language: 'en' | 'tr';
  testName: string;
  resultLevel?: string;
  resultData?: {
    insights?: string[];
  };
}

export function GrowingMind({ language, testName, resultLevel, resultData }: GrowingMindProps) {
  const isMobile = useMobile();
  const [isTablet, setIsTablet] = useState(false);
  const growingMindContent = paymentPageContent.growingMind;

  useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  const getResultEmojis = () => {
    if (resultLevel === 'excellent') return ['🌸', '✨', '💖'];
    if (resultLevel === 'good') return ['🌺', '🌟', '💫'];
    return ['🌸', '🌺', '💖'];
  };

  const getPlaceholderInsights = () => [
    'Understanding Your Patterns: Discover how your mind processes emotions and thoughts',
    'Emotional Awareness: Learn to recognize and manage your emotional responses',
    'Thought Balance: Explore the relationship between your thoughts and feelings',
    'Growth Strategies: Practical steps to improve your mental well-being',
    'Future Potential: Unlock your path to emotional resilience and balance',
    'Self-Care Essentials: Build daily habits that support your mental wellness'
  ];

  const displayInsights = resultData?.insights && resultData.insights.length > 0
    ? resultData.insights
    : getPlaceholderInsights();

  const renderInsightCard = (insight: string, index: number, rowOffset: number = 0) => {
    const parts = insight.split(':');
    const title = parts.length > 1 ? parts[0].trim() : '';
    const description = parts.length > 1 ? parts.slice(1).join(':').trim() : insight;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: rowOffset === 0 ? -20 : rowOffset === 1 ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (rowOffset * 0.2) + (index % 2) * 0.1 + 0.1, duration: 0.4 }}
        whileHover={{
          scale: 1.06,
          boxShadow: '0 0 25px rgba(255,105,180,0.4)',
          background: 'linear-gradient(135deg, #fff5f8 0%, #ffe8eb 100%)',
          filter: 'brightness(1.1)',
          transition: { duration: 0.15, ease: 'easeInOut' }
        }}
        style={{
          width: isTablet ? '240px' : '270px',
          minHeight: isTablet ? '170px' : '180px',
          background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)',
          borderRadius: '16px',
          border: '1.5px solid rgba(255,105,180,0.15)',
          boxShadow: '0 2px 10px rgba(255,105,180,0.1)',
          padding: '18px 20px',
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'all 0.15s ease-in-out',
          transformOrigin: 'center',
        }}
      >
        {title && (
          <h4 style={{
            color: '#2196F3',
            fontWeight: '600',
            fontSize: '16px',
            margin: '0 0 12px 0',
            lineHeight: '1.3',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}>
            {title}
          </h4>
        )}
        <p style={{
          fontSize: '14.5px',
          color: '#555',
          textAlign: 'center',
          lineHeight: '1.55',
          margin: 0,
          filter: 'blur(4px)',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}>
          {description}
        </p>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'relative',
        maxWidth: '700px',
        margin: '0 auto 48px',
        background: '#ffffff',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        boxShadow: '0 24px 80px rgba(33, 150, 243, 0.2), 0 0 0 1px rgba(33, 150, 243, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        padding: isMobile ? '40px 28px' : '56px 48px',
        textAlign: 'center',
        border: '1px solid rgba(33, 150, 243, 0.15)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'all 0.2s ease-out',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          {/* Title */}
          <h2 style={{
            fontSize: isMobile ? '2rem' : '2.75rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 50%, #2196F3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            marginBottom: '8px',
            textShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
          }}>
            {(growingMindContent.title[language] || growingMindContent.title.en).replace('{testName}', testName)}
          </h2>

          {/* Decorative Line */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            margin: '8px 0 24px',
          }}>
            <span style={{
              flex: 1,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #2196F3, transparent)',
              maxWidth: '150px',
            }} />
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                fontSize: '18px',
                filter: 'drop-shadow(0 0 8px rgba(33, 150, 243, 0.8))',
              }}
            >
              🌸
            </motion.span>
            <span style={{
              flex: 1,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #2196F3, transparent)',
              maxWidth: '150px',
            }} />
          </div>

          {/* Emoji Group - Mobile: Below Title */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                fontSize: '30px',
                marginTop: '8px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              {getResultEmojis().map((emoji, index) => (
                <span key={index} style={{ display: 'inline-block' }}>
                  {emoji}
                </span>
              ))}
            </motion.div>
          )}

          {/* Symmetric 6-Card Layout */}
          {!isMobile ? (
            <div style={{
              position: 'relative',
              width: '100%',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '26px',
            }}>
              {/* Top Row: 2 Cards */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isTablet ? '20px' : '26px',
                width: '100%',
              }}>
                {displayInsights.slice(0, 2).map((insight: string, index: number) =>
                  renderInsightCard(insight, index, 0)
                )}
              </div>

              {/* Middle Row: 2 Cards */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isTablet ? '20px' : '26px',
                width: '100%',
              }}>
                {displayInsights.slice(2, 4).map((insight: string, index: number) =>
                  renderInsightCard(insight, index + 2, 1)
                )}
              </div>

              {/* Bottom Row: 2 Cards */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isTablet ? '20px' : '26px',
                width: '100%',
              }}>
                {displayInsights.slice(4, 6).map((insight: string, index: number) =>
                  renderInsightCard(insight, index + 4, 2)
                )}
              </div>
            </div>
          ) : (
            // Mobile: Vertical Stack
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '18px',
              width: '100%',
            }}>
              {displayInsights.slice(0, 6).map((insight: string, index: number) =>
                renderInsightCard(insight, index, 0)
              )}
            </div>
          )}

          {/* Intro Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            style={{
              width: '100%',
              marginTop: '32px',
              background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 100%)',
              borderRadius: '20px',
              padding: isMobile ? '24px 20px' : '32px 28px',
              border: '2px solid rgba(33, 150, 243, 0.2)',
              boxShadow: '0 8px 32px rgba(33, 150, 243, 0.15)',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontSize: isMobile ? '15px' : '17px',
              fontWeight: '700',
              color: '#2196F3',
              margin: 0,
              lineHeight: '1.6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}>
              <span>{growingMindContent.introCard.title[language] || growingMindContent.introCard.title.en}</span>
              <span style={{ fontSize: '20px' }}>☕</span>
            </p>
            <p style={{
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#666',
              margin: '12px 0 0 0',
              lineHeight: '1.5',
            }}>
              {growingMindContent.introCard.description[language] || growingMindContent.introCard.description.en}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

