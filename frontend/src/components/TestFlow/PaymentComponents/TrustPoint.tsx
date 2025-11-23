import { motion } from 'framer-motion';
import { useMobile } from '../../../hooks/useMobile';

interface TrustPointProps {
  emoji: string;
  title: string;
  description: string;
  index: number;
}

export function TrustPoint({ emoji, title, description, index }: TrustPointProps) {
  const isMobile = useMobile();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3 + index * 0.1,
        hover: { duration: 0.15, ease: 'easeOut' },
        default: { duration: 0.2, ease: 'easeIn' },
      }}
      whileHover={isMobile ? {} : {
        scale: 1.05,
        y: -8,
        zIndex: 10,
        boxShadow: '0 8px 24px rgba(108, 99, 255, 0.25)',
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 16px rgba(108, 99, 255, 0.1)',
        border: '1px solid rgba(108, 99, 255, 0.15)',
        position: 'relative',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
    >
      {isMobile ? (
        // Mobilde: İkon başlığın hemen solunda, birlikte ortalanmış
        <div style={{
          textAlign: 'center',
        }}>
          <h4
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#333',
              marginBottom: '8px',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '32px' }}>{emoji}</span>
            {title}
          </h4>
          <p
            style={{
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>
      ) : (
        // Desktop'ta: Mevcut layout (ikon üstte)
        <>
          <div
            style={{
              fontSize: '32px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {emoji}
          </div>
          <h4
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#333',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            {title}
          </h4>
          <p
            style={{
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.6',
              margin: 0,
              textAlign: 'center',
            }}
          >
            {description}
          </p>
        </>
      )}
    </motion.div>
  );
}

