import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { PersonalityTypeCard } from './PersonalityTypeCard';
import personalityTypesData from '../../data/shared/personality-types.json';

export function DeveloperControlPanel() {
  const isMobile = useMobile();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
        borderRadius: '16px',
        padding: isMobile ? '20px' : '32px',
        marginBottom: isMobile ? '32px' : '48px',
        boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '12px',
          fontWeight: '700',
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          🔧 Developer Only
        </div>
        <h2 style={{
          fontSize: isMobile ? '20px' : '24px',
          fontWeight: '700',
          color: 'white',
          margin: 0,
        }}>
          Personality Unlock Pages Control Panel
        </h2>
      </div>
      <p style={{
        fontSize: isMobile ? '13px' : '14px',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '24px',
        lineHeight: '1.6',
      }}>
        Click any personality type below to view its unlock page. This panel will be removed before production.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '12px',
      }}>
        {personalityTypesData.personalityTypes.map((personality) => (
          <PersonalityTypeCard key={personality.type} personality={personality} />
        ))}
      </div>
    </motion.div>
  );
}

