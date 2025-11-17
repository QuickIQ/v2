import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMobile } from '../../hooks/useMobile';
import { useTestsCompletedCounter } from '../../hooks/useTestsCompletedCounter';

export function TestsCompletedCounter() {
  const { i18n } = useTranslation();
  const isMobile = useMobile();
  const { count: testCount, formattedCount } = useTestsCompletedCounter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      style={{
        textAlign: 'center',
        marginTop: 0,
        marginBottom: isMobile ? '32px' : '48px',
        padding: isMobile ? '0 20px' : '0',
      }}
    >
      <motion.p
        key={testCount}
        initial={{ scale: 1 }}
        animate={{ scale: 1 }}
        style={{
          fontSize: isMobile ? '20px' : '24px',
          color: '#888',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          flexWrap: 'wrap',
          margin: 0,
        }}
      >
        {i18n.language === 'tr' ? (
          <>
            <span>Bugün</span>
            <motion.span
              key={testCount}
              initial={{ scale: 1.3, y: -5 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 20,
                duration: 0.5
              }}
              style={{
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: isMobile ? '22px' : '26px',
              }}
            >
              {formattedCount}
            </motion.span>
            <span>test tamamlandı!</span>
          </>
        ) : (
          <>
            <span>Today</span>
            <motion.span
              key={testCount}
              initial={{ scale: 1.3, y: -5 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 20,
                duration: 0.5
              }}
              style={{
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: isMobile ? '22px' : '26px',
              }}
            >
              {formattedCount}
            </motion.span>
            <span>test's completed!</span>
          </>
        )}
      </motion.p>
    </motion.div>
  );
}

