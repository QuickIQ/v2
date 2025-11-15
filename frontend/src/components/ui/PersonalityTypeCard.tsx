import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { usePersonalityTestStore } from '../../store/personalityTestStore';

interface PersonalityTypeCardProps {
  personality: {
    type: string;
    name: string;
    emoji: string;
  };
}

export function PersonalityTypeCard({ personality }: PersonalityTypeCardProps) {
  const isMobile = useMobile();

  return (
    <Link
      key={personality.type}
      to={`/test/personality/unlock?type=${personality.type}`}
      onClick={() => {
        // Set personality type in localStorage for UnlockPage to read
        localStorage.setItem('personality_result', JSON.stringify({
          typeCode: personality.type,
          typeName: personality.name,
        }));
        // Also set in Zustand store
        usePersonalityTestStore.getState().setPersonalityType(personality.type);
      }}
      style={{ textDecoration: 'none' }}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          padding: isMobile ? '16px 12px' : '20px 16px',
          textAlign: 'center',
          cursor: 'pointer',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{
          fontSize: isMobile ? '24px' : '32px',
          marginBottom: '8px',
        }}>
          {personality.emoji}
        </div>
        <div style={{
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '4px',
        }}>
          {personality.type}
        </div>
        <div style={{
          fontSize: isMobile ? '11px' : '12px',
          color: '#666',
          fontWeight: '500',
        }}>
          {personality.name}
        </div>
      </motion.div>
    </Link>
  );
}

