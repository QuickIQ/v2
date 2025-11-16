import { motion } from 'framer-motion';
import { Star, ArrowDown } from 'lucide-react';
import { useMobile } from '../../../hooks/useMobile';
import paymentPageContent from '../../../data/shared/payment-page-content.json';

interface AIAuroraCardProps {
  language: 'en' | 'tr';
}

export function AIAuroraCard({ language }: AIAuroraCardProps) {
  const isMobile = useMobile();
  const heroContent = paymentPageContent.hero;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      style={{
        position: 'relative',
        width: '90vw',
        maxWidth: '1000px',
        margin: '0 auto',
        marginBottom: isMobile ? '48px' : '64px',
        padding: isMobile ? '40px 24px' : '80px 60px',
        background: 'linear-gradient(135deg, #7B5CFF 0%, #5BE9FF 100%)',
        borderRadius: '28px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: 'inset 0 0 30px rgba(255,255,255,0.05), 0 0 50px rgba(124,90,255,0.35)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Subtle Aurora Glow Overlay */}
      <motion.div
        animate={{
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.08)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Shimmering Glow Pulse - Hover Effect */}
      <motion.div
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{
          x: '200%',
          opacity: [0, 0.6, 0],
          transition: {
            duration: 1.2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0.5,
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          transform: 'skewX(-20deg)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Slow Gradient Animation */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(135deg, #7B5CFF 0%, #5BE9FF 100%)',
            'linear-gradient(135deg, #6B4CFF 0%, #4BD9FF 100%)',
            'linear-gradient(135deg, #7B5CFF 0%, #5BE9FF 100%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      {/* Brightening Overlay on Hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{
          opacity: 0.15,
          transition: { duration: 0.4, ease: 'easeOut' }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '24px',
      }}>
        {/* Badge */}
        <motion.div
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            padding: '6px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: '600',
            letterSpacing: '0.5px',
          }}
        >
          {heroContent.badge[language] || heroContent.badge.en}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: isMobile ? '28px' : '38px',
            fontWeight: '700',
            color: '#f8f9ff',
            margin: 0,
            lineHeight: '1.3',
            textShadow: '0 2px 12px rgba(0,0,0,0.25)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {heroContent.title[language] || heroContent.title.en}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
            }}
          >
            <Star
              size={isMobile ? 28 : 36}
              fill="#FFD700"
              color="#FFD700"
              style={{
                filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.8))',
              }}
            />
          </motion.div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '4px 0 0 0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
          }}
        >
          {heroContent.subtitle[language] || heroContent.subtitle.en}
        </motion.p>

        {/* Main CTA Button */}
        <motion.button
          onClick={() => {
            const paymentSection = document.getElementById('payment-section');
            if (paymentSection) {
              paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 0 30px rgba(91,233,255,0.5)',
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
          style={{
            position: 'relative',
            padding: '18px 42px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            border: 'none',
            borderRadius: '14px',
            color: 'white',
            fontWeight: '700',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '8px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
            boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          <span style={{ display: 'inline-block' }}>
            {heroContent.ctaButton[language] || heroContent.ctaButton.en}
          </span>
          <motion.span
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <ArrowDown size={20} style={{ display: 'block' }} />
          </motion.span>
        </motion.button>
      </div>
    </motion.section>
  );
}

