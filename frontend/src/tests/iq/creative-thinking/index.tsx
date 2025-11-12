import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../../hooks/useMobile';
import { Sparkles, Star } from 'lucide-react';
import '../../../App.css';

interface Props {
  onStart: () => void;
}

function CreativeThinkingIntro({ onStart }: Props) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  
  // Helper to get translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FDE1E3 0%, #E4ECFF 50%, #E3FDFD 100%)',
      paddingTop: isMobile ? '100px' : '120px',
      paddingBottom: isMobile ? '40px' : '48px',
      paddingLeft: isMobile ? '20px' : '40px',
      paddingRight: isMobile ? '20px' : '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(135deg, #FDE1E3 0%, #E4ECFF 50%, #E3FDFD 100%)',
            'linear-gradient(135deg, #E4ECFF 0%, #E3FDFD 50%, #FDE1E3 100%)',
            'linear-gradient(135deg, #E3FDFD 0%, #FDE1E3 50%, #E4ECFF 100%)',
            'linear-gradient(135deg, #FDE1E3 0%, #E4ECFF 50%, #E3FDFD 100%)',
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
          zIndex: 0,
        }}
      />

      <div style={{
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: isMobile ? '36px' : '48px',
            marginBottom: '16px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #6C63FF 0%, #FF6FB1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          {getTranslation('tests.creativeThinking.landing.title', 'Before You Begin')}
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
            }}
          >
            <Star 
              size={isMobile ? 32 : 40} 
              style={{ 
                color: '#FFD700',
                filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))',
                fill: '#FFD700',
              }} 
            />
          </motion.div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: isMobile ? '18px' : '22px',
            color: '#555',
            marginBottom: '32px',
            fontWeight: '500',
            lineHeight: '1.5',
            textAlign: 'center',
          }}
        >
          {getTranslation('tests.creativeThinking.landing.subtitle', 'Answer honestly — this test is for your self-discovery, not for judgment.')}
        </motion.p>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: '0 16px 48px rgba(108, 99, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.5)',
            transition: { duration: 0.15, ease: 'easeOut' }
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: isMobile ? '24px' : '32px',
            borderRadius: '20px',
            marginBottom: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.15s ease-out',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            color: '#555',
            lineHeight: '1.7',
            textAlign: 'center',
            margin: 0,
            marginBottom: '16px',
          }}>
            {getTranslation('tests.creativeThinking.landing.description', 'Be as genuine as possible. Your responses are not stored or shared — they\'re only used to calculate your result.')}
          </p>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#666',
            lineHeight: '1.6',
            textAlign: 'center',
            margin: 0,
            fontStyle: 'italic',
          }}>
            {getTranslation('tests.creativeThinking.landing.reminder', 'You\'ll have 10 minutes to answer 20 questions. Take a deep breath and focus — this is your moment of reflection.')}
          </p>
        </motion.div>

        {/* Separator with icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            gap: '12px',
          }}
        >
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.3), transparent)',
          }} />
          <Sparkles size={20} style={{ color: '#6c63ff', opacity: 0.6 }} />
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.3), transparent)',
          }} />
        </motion.div>

        {/* Test Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: isMobile ? '24px' : '32px',
              boxShadow: '0 4px 16px rgba(108, 99, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              flex: 1,
              maxWidth: isMobile ? '100%' : '200px',
            }}
          >
            <div style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 'bold', color: '#6c63ff', marginBottom: '8px' }}>
              20
            </div>
            <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#666', fontWeight: '500' }}>
              {getTranslation('tests.creativeThinking.landing.questions', 'Questions')}
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: isMobile ? '24px' : '32px',
              boxShadow: '0 4px 16px rgba(108, 99, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              flex: 1,
              maxWidth: isMobile ? '100%' : '200px',
            }}
          >
            <div style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 'bold', color: '#6c63ff', marginBottom: '8px' }}>
              10
            </div>
            <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#666', fontWeight: '500' }}>
              {getTranslation('tests.creativeThinking.landing.minutes', 'Minutes')}
            </div>
          </motion.div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.7,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          style={{ 
            textAlign: 'center',
          }}
        >
          <motion.button
            onClick={onStart}
            whileHover={{ 
              scale: 1.15,
              y: -8,
              boxShadow: '0 16px 50px rgba(108, 99, 255, 0.7), 0 0 60px rgba(155, 201, 237, 0.6), 0 0 80px rgba(108, 99, 255, 0.4)',
              transition: { duration: 0.15, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontSize: isMobile ? '18px' : '20px',
              padding: isMobile ? '18px 48px' : '20px 56px',
              background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(108, 99, 255, 0.4)',
              transition: 'all 0.15s ease-out',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            <motion.span
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(108, 99, 255, 0.7)',
                  '0 0 0 10px rgba(108, 99, 255, 0)',
                  '0 0 0 0 rgba(108, 99, 255, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                pointerEvents: 'none',
              }}
            />
            {getTranslation('tests.creativeThinking.landing.startButton', 'Continue')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default CreativeThinkingIntro;

