import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../../../hooks/useMobile';
import { useTestsCompletedCounter } from '../../../hooks/useTestsCompletedCounter';
import '../../../App.css';

interface Props {
  onComplete: () => void;
}

function PerfectionismAnalyzingPage({ onComplete }: Props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const { count: testCount, text: testsCompletedText, formattedCount } = useTestsCompletedCounter();
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);
  const shownPopupsRef = useRef<Set<number>>(new Set());

  // Helper to get translation with fallback
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  // Trust cards with localized content
  const trustCards = [
    {
      name: i18n.language === 'tr' ? 'Elif D.' : 'Sarah M.',
      city: i18n.language === 'tr' ? 'İzmir' : 'New York',
      text: i18n.language === 'tr' 
        ? 'Sonuçlar şaşırtıcı derecede doğruydu, kendimi daha iyi tanıdım.'
        : 'The results were surprisingly accurate, I learned so much about myself.',
      stars: 5,
    },
    {
      name: i18n.language === 'tr' ? 'Ali C.' : 'Michael R.',
      city: i18n.language === 'tr' ? 'Ankara' : 'London',
      text: i18n.language === 'tr'
        ? 'Analiz süreci çok akıcıydı, sonuçlar etkileyici.'
        : 'The analysis process was so smooth, the results were impressive.',
      stars: 5,
    },
    {
      name: i18n.language === 'tr' ? 'Deniz K.' : 'Emma L.',
      city: i18n.language === 'tr' ? 'İstanbul' : 'Toronto',
      text: i18n.language === 'tr'
        ? 'Gerçekten profesyonelce hazırlanmış bir test.'
        : 'A truly professionally prepared test.',
      stars: 5,
    },
    {
      name: i18n.language === 'tr' ? 'Selin Y.' : 'James P.',
      city: i18n.language === 'tr' ? 'Antalya' : 'Sydney',
      text: i18n.language === 'tr'
        ? 'Sonuçlarım kariyer planımda bana yön verdi.'
        : 'My results guided me in my career planning.',
      stars: 5,
    },
  ];

  // Rotate trust cards every 3 seconds (slower)
  useEffect(() => {
    const cardInterval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % trustCards.length);
    }, 3000);

    return () => clearInterval(cardInterval);
  }, [trustCards.length]);


  // Progress animation - 10 seconds total (100 steps of 100ms)
  useEffect(() => {
    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Reset shown popups
    shownPopupsRef.current = new Set();
    
    // Start progress animation immediately
    progressIntervalRef.current = setInterval(() => {
      // Skip if paused (popup is showing)
      if (isPausedRef.current) {
        return;
      }
      
      setProgress((prev) => {
        const next = prev + 1;
        
        // Show popup only once per milestone (35% and 70%)
        if ((next === 35 || next === 70) && !shownPopupsRef.current.has(next)) {
          shownPopupsRef.current.add(next);
          setPopupStep(next);
          setShowPopup(true);
          isPausedRef.current = true; // Pause progress
          return prev; // Don't increment yet
        }
        
        // Complete at 100%
        if (next >= 100) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          console.log('✅ Progress reached 100%, calling onComplete in 800ms...');
          setTimeout(() => {
            console.log('📞 Calling onComplete callback...');
            try {
              onComplete();
              console.log('✅ onComplete callback executed successfully');
            } catch (error) {
              console.error('❌ Error in onComplete callback:', error);
            }
          }, 800);
          return 100;
        }
        
        return next;
      });
    }, 100); // 100ms per step = 10 seconds total

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [onComplete]);

  const handlePopupChoice = () => {
    setShowPopup(false);
    isPausedRef.current = false; // Resume progress
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
            'linear-gradient(135deg, #FFF4F0 0%, #FBEAFF 100%)',
            'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
          ],
        }}
        transition={{
          duration: 3,
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
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '24px',
        padding: isMobile ? '30px 20px' : '40px',
        boxShadow: '0 20px 60px rgba(108, 99, 255, 0.15)',
      }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          {getTranslation('tests.perfectionism.calculating.title', 'Analyzing your perfectionism patterns and achievement balance...')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#666',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          {getTranslation('tests.perfectionism.calculating.subtitle', 'Our AI is evaluating your responses. This will take a few seconds...')}
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            width: '100%',
            background: '#e0e0e0',
            height: '12px',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '32px',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <motion.div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
              borderRadius: '10px',
              transition: 'width 0.1s linear',
              boxShadow: '0 2px 8px rgba(108, 99, 255, 0.4)',
            }}
          />
        </motion.div>

        {/* Trust Cards Grid - Rotating display */}
        <AnimatePresence mode="wait">
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '12px',
            marginTop: '24px',
            minHeight: isMobile ? '120px' : '140px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {trustCards.map((card, index) => {
              // Show 2 cards at a time on desktop, 1 on mobile
              const isVisible = isMobile 
                ? index === currentCardIndex
                : index === currentCardIndex || index === (currentCardIndex + 1) % trustCards.length;
              
              if (!isVisible) return null;
              
              return (
                <motion.div
                  key={`${card.name}-${index}-${currentCardIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(108, 99, 255, 0.2)',
                    width: '100%',
                  }}
                >
                  {/* Stars */}
                  <div style={{
                    color: '#FFD700',
                    fontSize: '14px',
                    marginBottom: '8px',
                    letterSpacing: '2px',
                  }}>
                    {'★'.repeat(card.stars)}{'☆'.repeat(5 - card.stars)}
                  </div>
                  
                  {/* Review Text */}
                  <p style={{
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#555',
                    fontStyle: 'italic',
                    marginBottom: '12px',
                    lineHeight: '1.5',
                  }}>
                    "{card.text}"
                  </p>
                  
                  {/* Author */}
                  <p style={{
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: '500',
                  }}>
                    {card.name} – {card.city}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {/* Tests Completed Today Notification */}
        {testsCompletedText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              marginTop: '32px',
              padding: '16px',
              background: 'rgba(108, 99, 255, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(108, 99, 255, 0.2)',
              textAlign: 'center',
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
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                flexWrap: 'wrap',
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
        )}
      </div>

      {/* Popup Questions at 35% and 70% */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: '20px',
            }}
            onClick={handlePopupChoice}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: isMobile ? '24px' : '32px',
                maxWidth: '400px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                textAlign: 'center',
              }}
            >
              {/* Emoji */}
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
              }}>
                ✨
              </div>

              {/* Question Text */}
              <p style={{
                fontSize: isMobile ? '16px' : '18px',
                color: '#333',
                marginBottom: '24px',
                fontWeight: '500',
                lineHeight: '1.6',
              }}>
                {popupStep === 35
                  ? (i18n.language === 'tr'
                      ? 'Kendinizi sürekli yorgun hissediyor musunuz?'
                      : 'Do you constantly feel tired?')
                  : (i18n.language === 'tr'
                      ? 'Günlük aktivitelerden zevk almakta zorlanıyor musunuz?'
                      : 'Do you struggle to find joy in daily activities?')}
              </p>

              {/* Buttons */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}>
                <motion.button
                  onClick={handlePopupChoice}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    padding: '12px 20px',
                    background: '#FFE4E1',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#333',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {popupStep === 35
                    ? (i18n.language === 'tr' ? 'Evet' : 'Yes')
                    : (i18n.language === 'tr' ? 'Evet' : 'Yes')}
                </motion.button>
                <motion.button
                  onClick={handlePopupChoice}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg, #ff69b4 0%, #ffb6c1 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {popupStep === 35
                    ? (i18n.language === 'tr' ? 'Hayır' : 'No')
                    : (i18n.language === 'tr' ? 'Hayır' : 'No')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PerfectionismAnalyzingPage;

