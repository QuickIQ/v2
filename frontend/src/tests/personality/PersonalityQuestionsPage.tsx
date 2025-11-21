import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonalityTestStore, PersonalityQuestion, PersonalityAnswer } from '../../store/personalityTestStore';
import { useMobile } from '../../hooks/useMobile';
import { Clock } from 'lucide-react';
import { logger } from '../../utils/logger';
import '../../App.css';

interface Props {
  questions: PersonalityQuestion[];
  onComplete: () => void;
}

// Gradient colors for options - specified gradient
const optionGradient = 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)';

function PersonalityQuestionsPage({ questions, onComplete }: Props) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const {
    currentQuestionIndex,
    timeRemaining,
    answers,
    setCurrentQuestionIndex,
    addAnswer,
    setTimeRemaining,
  } = usePersonalityTestStore();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [autoAdvancing, setAutoAdvancing] = useState(false);
  const [questionKey, setQuestionKey] = useState(0); // For animation
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timer interval

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.question_id === currentQuestion?.id);

  // Initialize selected option
  useEffect(() => {
    if (currentAnswer) {
      setSelectedOption(currentAnswer.option_index);
    } else {
      setSelectedOption(null);
    }
    setQuestionKey(currentQuestionIndex); // Trigger animation
  }, [currentQuestionIndex, currentAnswer]);

  // Initialize and start timer when component mounts
  useEffect(() => {
    // Clear any existing timer first
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // Get current time from store
    let currentTime = usePersonalityTestStore.getState().timeRemaining;
    logger.debug('🕐 Timer initialization, currentTime from store:', currentTime);
    
    // If timer is invalid, set it to 15 minutes
    if (!currentTime || currentTime <= 0 || currentTime > 15 * 60 || isNaN(currentTime)) {
      logger.debug('🕐 Timer invalid, setting to 15 minutes');
      currentTime = 15 * 60;
      setTimeRemaining(currentTime);
    } else {
      logger.debug('✅ Timer already set to:', currentTime, 'seconds');
    }

    // If timer is already at 0, complete the test
    if (currentTime <= 0) {
      logger.debug('⏰ Timer already at 0, completing test');
      onComplete();
      return;
    }

    logger.debug('✅ Starting timer countdown from:', currentTime, 'seconds');

    // Start countdown interval immediately
    timerIntervalRef.current = setInterval(() => {
      // Get current time from store directly to avoid stale closure
      const storeTime = usePersonalityTestStore.getState().timeRemaining;
      
      if (!storeTime || storeTime <= 0 || isNaN(storeTime)) {
        logger.debug('⚠️ Timer invalid in interval, stopping');
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        setTimeout(() => onComplete(), 0);
        return;
      }
      
      const newTime = storeTime - 1;
      
      // Update store with new time
      setTimeRemaining(newTime);
      
      // If time reaches 0, complete the test
      if (newTime <= 0) {
        logger.debug('⏰ Timer reached 0, completing test');
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        setTimeout(() => onComplete(), 0);
      }
    }, 1000);

    return () => {
      logger.debug('🧹 Cleaning up timer');
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const formatTime = (seconds: number) => {
    // Handle invalid or NaN values
    if (!seconds || isNaN(seconds) || seconds < 0) {
      return '15:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!currentQuestion || autoAdvancing) return;

    setSelectedOption(optionIndex);
    const option = currentQuestion.options[optionIndex];
    
    const answer: PersonalityAnswer = {
      question_id: currentQuestion.id,
      option_index: optionIndex,
      axis: option.axis,
    };

    addAnswer(answer);

    // Auto-advance smoothly after a brief delay (no message shown)
    setAutoAdvancing(true);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // Move to next question smoothly
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAutoAdvancing(false);
      } else {
        // Last question answered - complete test
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 500); // Reduced delay for smoother transition
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0 && !autoAdvancing) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1 && !autoAdvancing) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (!currentQuestion) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#FF8FA3' }}>
          {t('common.loading') || 'Loading...'}
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
        padding: '40px',
      }}>
        <div className="card" style={{
          maxWidth: '600px',
          padding: '40px',
          textAlign: 'center',
        }}>
          <div style={{ color: '#e74c3c', marginBottom: '20px' }}>
            {t('tests.personality.errors.load_questions') || 'Failed to load questions. Please try again.'}
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      padding: isMobile ? '20px' : '40px',
      paddingTop: isMobile ? '80px' : '100px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: '#e0e0e0',
          zIndex: 1000,
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          style={{
            height: '100%',
            background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
          }}
        />
      </motion.div>

      {/* Header with Timer */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto 30px',
          padding: isMobile ? '0 10px' : '0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
          <div style={{ 
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '600',
            color: '#FF8FA3',
          }}>
            {t('tests.personality.questions.title', { 
              current: currentQuestionIndex + 1, 
              total: questions.length 
            })}
          </div>
        
        {/* Right side: Timer and Skip Button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          {/* Developer Skip Button - Only visible in development */}
          {((import.meta as any).env?.DEV || (import.meta as any).env?.MODE === 'development') && (
          <motion.button
            onClick={() => {
              // Auto-answer all remaining questions with first option (for developer testing)
              const store = usePersonalityTestStore.getState();
              const currentAnswers = store.answers;
              const answeredQuestionIds = new Set(currentAnswers.map(a => a.question_id));
              
              // Find unanswered questions and auto-answer them
              questions.forEach((question) => {
                if (!answeredQuestionIds.has(question.id) && question.options.length > 0) {
                  const firstOption = question.options[0];
                  const answer: PersonalityAnswer = {
                    question_id: question.id,
                    option_index: 0,
                    axis: firstOption.axis,
                  };
                  addAnswer(answer);
                }
              });
              
              // Jump to last question
              setCurrentQuestionIndex(questions.length - 1);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '6px 12px',
              background: 'rgba(255, 143, 163, 0.15)',
              border: '1px dashed rgba(255, 143, 163, 0.5)',
              borderRadius: '8px',
              color: '#FF8FA3',
              fontSize: isMobile ? '11px' : '12px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'monospace',
              opacity: 0.7,
              transition: 'all 0.2s ease',
            }}
            title="Developer: Auto-answer remaining questions and skip to Q25"
          >
            Skip to Q25
          </motion.button>
          )}

          {/* Timer with pulse animation */}
          <motion.div
            animate={{
              scale: timeRemaining <= 60 ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: timeRemaining <= 60 ? Infinity : 0,
              ease: 'easeInOut',
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: timeRemaining <= 60 ? 'rgba(231, 76, 60, 0.1)' : 'rgba(255, 143, 163, 0.1)',
              borderRadius: '12px',
              border: `2px solid ${timeRemaining <= 60 ? '#e74c3c' : '#FF8FA3'}`,
            }}
          >
            <Clock 
              size={20} 
              style={{ 
                color: timeRemaining <= 60 ? '#e74c3c' : '#FF8FA3',
                filter: timeRemaining <= 60 ? 'drop-shadow(0 0 8px rgba(231, 76, 60, 0.5))' : 'drop-shadow(0 0 4px rgba(255, 143, 163, 0.3))',
              }} 
            />
            <span style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: 'bold',
              color: timeRemaining <= 60 ? '#e74c3c' : '#FF8FA3',
              fontFamily: 'monospace',
              letterSpacing: '1px',
            }}>
              {formatTime(timeRemaining)}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Question Card with fade animation */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={questionKey}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="card"
            style={{
              width: '100%',
              padding: isMobile ? '30px 20px' : '40px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(236, 72, 153, 0.15)',
            }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: isMobile ? '24px' : '32px',
                marginBottom: '32px',
                lineHeight: '1.4',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <span style={{
                fontSize: isMobile ? '28px' : '36px',
                display: 'inline-block',
                animation: 'pulse 2s ease-in-out infinite',
              }}>
                {(() => {
                  // Get emoji based on question ID for precise matching
                  const questionId = currentQuestion.id;
                  const emojiMap: { [key: number]: string } = {
                    1: '💼',  // You prefer to work...
                    2: '🤔',  // When making decisions, you rely more on...
                    3: '📚',  // You prefer information that is...
                    4: '🎉',  // Your ideal weekend involves...
                    5: '👥',  // In social situations, you...
                    6: '🤗',  // When someone is upset, you tend to...
                    7: '📖',  // You learn best when...
                    8: '🗂️',  // Your workspace is typically...
                    9: '🔋',  // After a long day, you recharge by...
                    10: '💰', // When evaluating a job offer, you prioritize...
                    11: '📖', // You prefer stories that...
                    12: '✈️', // When planning a vacation, you...
                    13: '💬', // In group discussions, you...
                    14: '💡', // When giving feedback, you focus on...
                    15: '✅', // You trust information that is...
                    16: '⏰', // Your approach to deadlines is...
                    17: '🎉', // At parties, you...
                    18: '🧩', // When solving problems, you...
                    19: '🔮', // You're more interested in...
                    20: '📅', // Your ideal work schedule is...
                    21: '🎓', // When learning something new, you prefer...
                    22: '⚖️', // You make decisions by...
                    23: '⚡', // Your energy comes from...
                    24: '📋', // You prefer tasks that are...
                    25: '🌊', // When facing uncertainty, you...
                  };
                  return emojiMap[questionId] || '💭';
                })()}
              </span>
              <span style={{
                background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                flex: 1,
              }}>
                {currentQuestion.text}
              </span>
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  whileHover={!autoAdvancing ? { 
                    scale: 1.05,
                    boxShadow: '0 8px 24px rgba(255, 143, 163, 0.4)',
                  } : {}}
                  whileTap={!autoAdvancing ? { scale: 0.98 } : {}}
                  disabled={autoAdvancing}
                  style={{
                    padding: '20px 24px',
                    border: selectedOption === index 
                      ? '3px solid #FF8FA3' 
                      : '2px solid transparent',
                    borderRadius: '16px',
                    background: selectedOption === index
                      ? optionGradient
                      : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                    cursor: autoAdvancing ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: selectedOption === index ? '600' : '500',
                    color: selectedOption === index ? '#333' : '#555',
                    transition: 'all 0.3s ease',
                    opacity: autoAdvancing ? 0.6 : 1,
                    boxShadow: selectedOption === index
                      ? '0 4px 16px rgba(255, 143, 163, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '32px',
              gap: '16px',
            }}>
              <motion.button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0 || autoAdvancing}
                whileHover={currentQuestionIndex > 0 && !autoAdvancing ? { scale: 1.05 } : {}}
                whileTap={currentQuestionIndex > 0 && !autoAdvancing ? { scale: 0.95 } : {}}
                style={{
                  padding: isMobile ? '12px 24px' : '14px 28px',
                  background: currentQuestionIndex === 0 || autoAdvancing
                    ? '#e0e0e0'
                    : 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: currentQuestionIndex === 0 || autoAdvancing ? '#999' : 'white',
                  fontWeight: '600',
                  fontSize: isMobile ? '14px' : '16px',
                  cursor: currentQuestionIndex === 0 || autoAdvancing ? 'not-allowed' : 'pointer',
                  opacity: currentQuestionIndex === 0 || autoAdvancing ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                }}
              >
                {t('common.back') || 'Previous'}
              </motion.button>

              {currentQuestionIndex < questions.length - 1 && (
                <motion.button
                  onClick={handleNextQuestion}
                  disabled={!currentAnswer || autoAdvancing}
                  whileHover={currentAnswer && !autoAdvancing ? { scale: 1.05 } : {}}
                  whileTap={currentAnswer && !autoAdvancing ? { scale: 0.95 } : {}}
                  style={{
                    padding: isMobile ? '12px 24px' : '14px 28px',
                    background: !currentAnswer || autoAdvancing
                      ? '#e0e0e0'
                      : 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: !currentAnswer || autoAdvancing ? '#999' : 'white',
                    fontWeight: '600',
                    fontSize: isMobile ? '14px' : '16px',
                    cursor: !currentAnswer || autoAdvancing ? 'not-allowed' : 'pointer',
                    opacity: !currentAnswer || autoAdvancing ? 0.5 : 1,
                    transition: 'all 0.3s ease',
                    marginLeft: 'auto',
                  }}
                >
                  {t('common.next') || 'Next'}
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PersonalityQuestionsPage;
