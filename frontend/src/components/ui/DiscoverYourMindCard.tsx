import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';

export function DiscoverYourMindCard() {
  const isMobile = useMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      whileHover={isMobile ? {} : {
        scale: 1.02,
        y: -4,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      style={{
        width: '100%',
        marginBottom: isMobile ? '24px' : '32px',
        marginTop: isMobile ? '32px' : '48px',
        padding: isMobile ? '0 20px' : '0',
      }}
    >
      <motion.div
        animate={{
          background: [
            'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(155, 201, 237, 0.15) 50%, rgba(139, 92, 246, 0.12) 100%)',
            'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(108, 99, 255, 0.15) 50%, rgba(155, 201, 237, 0.15) 100%)',
            'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(155, 201, 237, 0.15) 50%, rgba(139, 92, 246, 0.12) 100%)',
          ],
          boxShadow: [
            '0 8px 32px rgba(108, 99, 255, 0.25), 0 0 40px rgba(155, 201, 237, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)',
            '0 12px 48px rgba(139, 92, 246, 0.3), 0 0 50px rgba(108, 99, 255, 0.25), inset 0 0 80px rgba(255, 255, 255, 0.15)',
            '0 8px 32px rgba(108, 99, 255, 0.25), 0 0 40px rgba(155, 201, 237, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(155, 201, 237, 0.15) 50%, rgba(139, 92, 246, 0.12) 100%)',
          borderRadius: '24px',
          border: '2px solid rgba(108, 99, 255, 0.3)',
          padding: isMobile ? '28px 24px' : '36px 48px',
          boxShadow: '0 8px 32px rgba(108, 99, 255, 0.25), 0 0 40px rgba(155, 201, 237, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Animated rainbow shimmer */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '200%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.3) 10%, rgba(255, 165, 0, 0.3) 20%, rgba(255, 255, 0, 0.3) 30%, rgba(0, 255, 0, 0.3) 40%, rgba(0, 0, 255, 0.3) 50%, rgba(75, 0, 130, 0.3) 60%, rgba(238, 130, 238, 0.3) 70%, transparent 80%, transparent 100%)',
            pointerEvents: 'none',
            filter: 'blur(8px)',
          }}
        />
        
        {/* Decorative dots pattern */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(108, 99, 255, 0.2) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
          opacity: 0.3,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(155, 201, 237, 0.2) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
          opacity: 0.3,
          pointerEvents: 'none',
        }} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{
            fontSize: isMobile ? 'clamp(12px, 3.2vw, 15px)' : '24px',
            fontWeight: '700',
            lineHeight: isMobile ? '1.2' : '1.5',
            margin: 0,
            background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 50%, #8B5CF6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 20px rgba(108, 99, 255, 0.3)',
            position: 'relative',
            zIndex: 1,
            letterSpacing: isMobile ? '0px' : '0.3px',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            overflow: 'visible',
            textOverflow: 'clip',
          }}
        >
          Discover your mind, reveal your truth, unlock your potential, and transform yourself.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

