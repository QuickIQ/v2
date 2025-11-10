import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonalityTestStore } from '../../store/personalityTestStore';
import { useMobile } from '../../hooks/useMobile';
import '../../App.css';

interface Props {
  onComplete: () => void;
}

function PersonalityAnalyzingPage({ onComplete }: Props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const { answers, questions } = usePersonalityTestStore();
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);
  const shownPopupsRef = useRef<Set<number>>(new Set());
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Wait for answers to hydrate before proceeding
  useEffect(() => {
    // Give time for Zustand persist to hydrate from localStorage
    const hydrationTimeout = setTimeout(() => {
      const store = usePersonalityTestStore.getState();
      const storeAnswers = store.answers;
      const storeQuestions = store.questions;
      
      console.log('🔍 Analyzing page - Checking hydration:');
      console.log('  - Answers length:', storeAnswers.length);
      console.log('  - Questions length:', storeQuestions.length);
      
      // Check if we have valid answers
      if (storeAnswers.length === 0 || storeQuestions.length === 0) {
        console.warn('⚠️ No answers or questions found, waiting 300ms before redirect...');
        
        // Wait 300-500ms before redirecting to allow for async hydration
        redirectTimeoutRef.current = setTimeout(() => {
          const finalCheck = usePersonalityTestStore.getState();
          if (finalCheck.answers.length === 0 || finalCheck.questions.length === 0) {
            console.error('❌ Still no answers after hydration delay, redirecting to start');
            // Redirect handled by parent component
            // For now, just mark as not hydrated so parent can handle
            setIsHydrated(false);
          } else {
            console.log('✅ Answers found after delay, proceeding');
            setIsHydrated(true);
          }
        }, 400); // 400ms delay
      } else {
        console.log('✅ Answers already available, proceeding');
        setIsHydrated(true);
      }
    }, 100); // Initial 100ms delay for hydration

    return () => {
      clearTimeout(hydrationTimeout);
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  // Rotate trust cards every 2 seconds
  useEffect(() => {
    const cardInterval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % trustCards.length);
    }, 2000);

    return () => clearInterval(cardInterval);
  }, [trustCards.length]);

  // Progress animation - 10 seconds total (100 steps of 100ms)
  useEffect(() => {
    // Don't start progress until hydrated
    if (!isHydrated) {
      return;
    }

    // Verify we still have answers before starting
    const store = usePersonalityTestStore.getState();
    if (store.answers.length === 0 || store.questions.length === 0) {
      console.warn('⚠️ No answers found when starting progress, aborting');
      return;
    }

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Reset shown popups
    shownPopupsRef.current = new Set();
    
    // Start progress animation
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
          setTimeout(() => {
            onComplete();
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
  }, [onComplete, isHydrated]);

  const handlePopupChoice = () => {
    setShowPopup(false);
    isPausedRef.current = false; // Resume progress
  };

  // Show loading if not hydrated yet
  if (!isHydrated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFE3DC 0%, #FFD2CC 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px' : '40px',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#FF8FA3' }}>
          {t('common.loading') || 'Loading...'}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFE3DC 0%, #FFD2CC 100%)',
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
            'linear-gradient(135deg, #FFE3DC 0%, #FFD2CC 100%)',
            'linear-gradient(135deg, #FFD2CC 0%, #FFE3DC 100%)',
            'linear-gradient(135deg, #FFE3DC 0%, #FFD2CC 100%)',
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
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
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
          {t('tests.personality.calculating.title') || 'Analyzing your results...'}
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
          {t('tests.personality.calculating.subtitle') || 'Our AI is evaluating your responses. This will take a few seconds...'}
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
              background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
              borderRadius: '10px',
              transition: 'width 0.1s linear',
              boxShadow: '0 2px 8px rgba(255, 143, 163, 0.4)',
            }}
          />
        </motion.div>

        {/* Trust Cards Grid - Rotating display */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '12px',
          marginTop: '24px',
          minHeight: isMobile ? '120px' : '140px',
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
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(255, 143, 163, 0.2)',
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
                      ? 'Geçmişi mi yoksa geleceği mi düşünmeyi tercih ediyorsunuz?'
                      : 'Do you prefer thinking about the past or the future?')
                  : (i18n.language === 'tr'
                      ? 'Karar alırken mantığınızı mı yoksa sezgilerinizi mi dinlersiniz?'
                      : 'When making decisions, do you follow your logic or your intuition?')}
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
                    background: '#E0E7FF',
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
                    ? (i18n.language === 'tr' ? 'Geçmiş' : 'Past')
                    : (i18n.language === 'tr' ? 'Mantık' : 'Logic')}
                </motion.button>
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
                    ? (i18n.language === 'tr' ? 'Gelecek' : 'Future')
                    : (i18n.language === 'tr' ? 'Sezgi' : 'Intuition')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PersonalityAnalyzingPage;
