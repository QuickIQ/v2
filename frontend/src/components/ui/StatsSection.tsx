import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { StatsCard } from './StatsCard';
import statsData from '../../data/shared/stats.json';

export function StatsSection() {
  const isMobile = useMobile();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: isMobile ? '12px' : '24px',
        marginBottom: isMobile ? '32px' : '48px',
        flexWrap: 'wrap'
      }}
    >
      {statsData.stats.map((stat, idx) => (
        <StatsCard key={idx} stat={stat} index={idx} />
      ))}
    </motion.div>
  );
}

