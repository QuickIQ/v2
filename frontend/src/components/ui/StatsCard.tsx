import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { useTranslation } from 'react-i18next';
import * as LucideIcons from 'lucide-react';

interface Stat {
  icon: string;
  value: {
    en: string;
    tr: string;
  };
  label: {
    en: string;
    tr: string;
  };
}

interface StatsCardProps {
  stat: Stat;
  index: number;
}

export function StatsCard({ stat, index }: StatsCardProps) {
  const isMobile = useMobile();
  const { i18n } = useTranslation();
  const language = i18n.language as 'en' | 'tr';
  
  // Get icon component dynamically
  const IconComponent = (LucideIcons as any)[stat.icon] || LucideIcons.HelpCircle;
  
  const value = stat.value[language] || stat.value.en;
  const label = stat.label[language] || stat.label.en;

  return (
    <motion.div
      key={index}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      whileHover={isMobile ? {} : { 
        scale: 1.03, 
        y: -5,
        boxShadow: '0 12px 40px rgba(102, 126, 234, 0.25), 0 4px 12px rgba(0,0,0,0.1), 0 0 20px rgba(102, 126, 234, 0.15)'
      }}
      style={{
        textAlign: 'center',
        padding: isMobile ? '20px 16px' : '28px 24px',
        background: 'rgba(255, 255, 255, 0.98)',
        borderRadius: isMobile ? '16px' : '20px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)',
        minWidth: isMobile ? '140px' : '180px',
        flex: isMobile ? '1 1 calc(50% - 6px)' : 'none',
        maxWidth: isMobile ? 'calc(50% - 6px)' : 'none',
        border: '1px solid rgba(255,255,255,0.8)',
        transition: 'all 0.3s ease',
      }}
    >
      <IconComponent 
        size={isMobile ? 32 : 40} 
        style={{ 
          marginBottom: isMobile ? '12px' : '16px',
          color: '#667eea',
          opacity: 0.9,
        }} 
      />
      <div style={{ 
        fontSize: isMobile ? '28px' : '36px', 
        fontWeight: '700', 
        marginBottom: isMobile ? '8px' : '10px',
        color: '#1a1a1a',
        letterSpacing: '-0.5px',
        lineHeight: '1.2',
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: isMobile ? '12px' : '14px', 
        color: '#666',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        marginTop: '6px',
        opacity: 0.9,
      }}>
        {label}
      </div>
    </motion.div>
  );
}

