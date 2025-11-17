import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';

interface CategoryButton {
  label: string;
  targetId: string;
}

const topRowButtons: CategoryButton[] = [
  { label: 'IQ TEST', targetId: 'iq-test-section' },
  { label: '16 Personalities', targetId: 'personality-test-section' },
];

const bottomRowButtons: CategoryButton[] = [
  { label: 'Bussiness', targetId: 'business-section' },
  { label: 'Health', targetId: 'health-section' },
  { label: 'Love', targetId: 'love-section' },
  { label: 'Money', targetId: 'money-section' },
  { label: 'Dark', targetId: 'dark-section' },
];

export function HomeCategories() {
  const isMobile = useMobile();

  const handleScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buttonStyle = {
    padding: isMobile ? '12px 20px' : '14px 24px',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(108, 99, 255, 0.2)',
    borderRadius: '12px',
    color: '#6C63FF',
    fontWeight: '600',
    fontSize: isMobile ? '14px' : '16px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? '16px' : '20px',
        marginTop: isMobile ? '32px' : '40px',
        marginBottom: isMobile ? '32px' : '40px',
        padding: isMobile ? '0 10px' : '0 20px',
      }}
    >
      {/* Top Row: IQ TEST and 16 Personalities */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: isMobile ? '12px' : '16px',
        }}
      >
        {topRowButtons.map((category, index) => (
          <motion.button
            key={category.targetId}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={isMobile ? {} : { scale: 0.98 }}
            onClick={() => handleScroll(category.targetId)}
            style={buttonStyle}
            onMouseEnter={isMobile ? undefined : (e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(108, 99, 255, 0.2)';
              e.currentTarget.style.background = 'rgba(108, 99, 255, 0.1)';
            }}
            onMouseLeave={isMobile ? undefined : (e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          >
            {category.label}
          </motion.button>
        ))}
      </div>

      {/* Bottom Row: Business, Health, Love, Money, Dark */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: isMobile ? '12px' : '12px',
        }}
      >
        {bottomRowButtons.map((category, index) => (
          <motion.button
            key={category.targetId}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
            whileHover={isMobile ? {} : { scale: 1.05 }}
            whileTap={isMobile ? {} : { scale: 0.98 }}
            onClick={() => handleScroll(category.targetId)}
            style={buttonStyle}
            onMouseEnter={isMobile ? undefined : (e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(108, 99, 255, 0.2)';
              e.currentTarget.style.background = 'rgba(108, 99, 255, 0.1)';
            }}
            onMouseLeave={isMobile ? undefined : (e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
            }}
          >
            {category.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

