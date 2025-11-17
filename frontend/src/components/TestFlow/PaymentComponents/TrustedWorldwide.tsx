import { motion } from 'framer-motion';
import { StatItem } from './StatItem';
import trustedWorldwideStatsData from '../../../data/shared/trusted-worldwide-stats.json';
import { useMobile } from '../../../hooks/useMobile';
import { useTestsCompletedCounter } from '../../../hooks/useTestsCompletedCounter';

interface TrustedWorldwideProps {
  language: 'en' | 'tr';
}

export function TrustedWorldwide({ language }: TrustedWorldwideProps) {
  const isMobile = useMobile();
  const { formattedCount } = useTestsCompletedCounter();
  const trustedWorldwideStats = trustedWorldwideStatsData;

  return (
    <motion.div
      whileHover={isMobile ? {} : {
        y: -2,
        boxShadow: '0 8px 28px rgba(0,0,0,0.06)',
      }}
      transition={{ duration: 0.15, ease: 'ease-out' }}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(245,245,255,0.45) 100%)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderRadius: '28px',
        border: '1px solid rgba(255,255,255,0.45)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.04), 0 2px 10px rgba(0,0,0,0.03)',
        padding: isMobile ? '22px' : '32px 32px 38px 32px',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
    >
      {/* Subtle top glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'radial-gradient(circle, rgba(140,120,255,0.12), transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          marginBottom: isMobile ? '20px' : '24px',
          textAlign: 'center',
        }}>
          <h3 style={{
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            fontWeight: '700',
            color: '#333',
            margin: 0,
            marginBottom: '6px',
          }}>
            {trustedWorldwideStats.header.title[language] || trustedWorldwideStats.header.title.en}
          </h3>
          <p style={{
            fontSize: '0.9rem',
            fontWeight: '500',
            opacity: 0.6,
            color: '#666',
            margin: 0,
          }}>
            {trustedWorldwideStats.header.subtitle[language] || trustedWorldwideStats.header.subtitle.en}
          </p>
        </div>

        {/* Content Sections */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '16px' : '22px',
          marginBottom: isMobile ? '20px' : '28px',
        }}>
          {trustedWorldwideStats.stats.map((stat) => (
            <StatItem
              key={stat.key}
              emoji={stat.emoji}
              title={
                stat.dynamic && stat.key === 'testsCompleted'
                  ? `${formattedCount} ${(stat.title[language] || stat.title.en).replace('{count}', '')}`
                  : stat.title[language] || stat.title.en
              }
              subtitle={stat.subtitle ? (stat.subtitle[language] || stat.subtitle.en) : undefined}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Country Flags Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          background: 'rgba(255,255,255,0.35)',
          border: '1px solid rgba(255,255,255,0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '50px',
          padding: '12px 18px',
          flexWrap: 'wrap',
        }}>
          {trustedWorldwideStats.countryFlags.map((flag, index) => (
            <span
              key={index}
              style={{
                fontSize: '1.5rem',
                lineHeight: '1',
              }}
            >
              {flag}
            </span>
          ))}
          <span style={{
            fontSize: '0.9rem',
            fontWeight: '500',
            opacity: 0.8,
            color: '#666',
          }}>
            {trustedWorldwideStats.countryFlagsText[language] || trustedWorldwideStats.countryFlagsText.en}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

