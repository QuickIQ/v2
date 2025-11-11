import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreativeThinkingTestStore, CreativeThinkingQuestion, CreativeThinkingAnswer } from '../../../store/creativeThinkingTestStore';
import { useMobile } from '../../../hooks/useMobile';
import { Clock } from 'lucide-react';
import '../../../App.css';

interface Props {
  questions: CreativeThinkingQuestion[];
  onComplete: () => void;
}

const optionGradient = 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)';

function CreativeThinkingQuestionsPage({ questions, onComplete }: Props) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const {
    currentQuestionIndex,
    timeRemaining,
    answers,
    setCurrentQuestionIndex,
    addAnswer,
    setTimeRemaining,
  } = useCreativeThinkingTestStore();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [autoAdvancing, setAutoAdvancing] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.question_id === currentQuestion?.id);

  useEffect(() => {
    if (currentAnswer) {
      setSelectedOption(currentAnswer.option_index);
    } else {
      setSelectedOption(null);
    }
    setQuestionKey(currentQuestionIndex);
  }, [currentQuestionIndex, currentAnswer]);

  useEffect(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    let currentTime = useCreativeThinkingTestStore.getState().timeRemaining;
    
    if (!currentTime || currentTime <= 0 || currentTime > 10 * 60 || isNaN(currentTime)) {
      currentTime = 10 * 60;
      setTimeRemaining(currentTime);
    }

    if (currentTime <= 0) {
      onComplete();
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      const storeTime = useCreativeThinkingTestStore.getState().timeRemaining;
      
      if (!storeTime || storeTime <= 0 || isNaN(storeTime)) {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        setTimeout(() => onComplete(), 0);
        return;
      }
      
      const newTime = storeTime - 1;
      setTimeRemaining(newTime);
      
      if (newTime <= 0) {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        setTimeout(() => onComplete(), 0);
      }
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || seconds < 0) {
      return '10:00';
    }
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!currentQuestion || autoAdvancing) return;

    setSelectedOption(optionIndex);
    
    // Base score: Never=1, Rarely=2, ..., Always=7 (optionIndex + 1)
    // Options order: ["Never", "Rarely", "Occasionally", "Neutral", "Often", "Usually", "Always"]
    // Reverse scoring is handled in calculateScore() in the store
    const baseScore = optionIndex + 1;
    
    const answer: CreativeThinkingAnswer = {
      question_id: currentQuestion.id,
      option_index: optionIndex,
      score: baseScore, // Store base score, reverse logic applied in calculateScore
    };

    addAnswer(answer);

    setAutoAdvancing(true);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAutoAdvancing(false);
      } else {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 500);
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

  const handleSkipToLast = () => {
    // Developer feature: Skip to last question (20th question)
    if (questions.length > 0 && !autoAdvancing) {
      setCurrentQuestionIndex(questions.length - 1);
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
        <div className="loading" style={{ fontSize: '18px', color: '#6c63ff' }}>
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
            {t('tests.creativeThinking.errors.load_questions') || 'Failed to load questions. Please try again.'}
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
            background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
          }}
        />
      </motion.div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
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
            style={{
              width: '100%',
            }}
          >
            {/* Header: Creativity Test + Question Progress + Timer - Just above the card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                width: '100%',
                padding: isMobile ? '0 20px' : '0',
                marginBottom: '16px',
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
                color: '#6c63ff',
              }}>
                Creativity Test
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}>
                {/* Question Progress Indicator - Left of Timer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  style={{
                    padding: isMobile ? '6px 10px' : '8px 14px',
                    background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.95) 0%, rgba(155, 201, 237, 0.95) 100%)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(108, 99, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'white',
                    fontSize: isMobile ? '12px' : '14px',
                    fontWeight: '600',
                  }}>
                    <span style={{
                      fontSize: isMobile ? '14px' : '16px',
                    }}>
                      {currentQuestionIndex + 1}
                    </span>
                    <span style={{
                      opacity: 0.8,
                    }}>
                      /
                    </span>
                    <span style={{
                      opacity: 0.8,
                    }}>
                      {questions.length}
                    </span>
                  </div>
                </motion.div>

                {/* Timer */}
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
                    background: timeRemaining <= 60 ? 'rgba(231, 76, 60, 0.1)' : 'rgba(108, 99, 255, 0.1)',
                    borderRadius: '12px',
                    border: `2px solid ${timeRemaining <= 60 ? '#e74c3c' : '#6c63ff'}`,
                  }}
                >
                  <Clock 
                    size={20} 
                    style={{ 
                      color: timeRemaining <= 60 ? '#e74c3c' : '#6c63ff',
                    }} 
                  />
                  <span style={{
                    fontSize: isMobile ? '18px' : '20px',
                    fontWeight: 'bold',
                    color: timeRemaining <= 60 ? '#e74c3c' : '#6c63ff',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                  }}>
                    {formatTime(timeRemaining)}
                  </span>
                </motion.div>

                {/* Developer Feature: Skip to Last Question */}
                {currentQuestionIndex < questions.length - 1 && (
                  <motion.button
                    onClick={handleSkipToLast}
                    disabled={autoAdvancing}
                    whileHover={!autoAdvancing ? { scale: 1.05 } : {}}
                    whileTap={!autoAdvancing ? { scale: 0.95 } : {}}
                    style={{
                      padding: isMobile ? '6px 10px' : '8px 12px',
                      background: 'rgba(255, 152, 0, 0.1)',
                      border: '1px solid rgba(255, 152, 0, 0.3)',
                      borderRadius: '8px',
                      color: '#ff9800',
                      fontSize: isMobile ? '10px' : '11px',
                      fontWeight: '600',
                      cursor: autoAdvancing ? 'not-allowed' : 'pointer',
                      opacity: autoAdvancing ? 0.5 : 1,
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                    title="Developer: Skip to last question (will be removed)"
                  >
                    ⚡ Skip to 20
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Question Card */}
            <div
              className="card"
              style={{
                width: '100%',
                padding: isMobile ? '30px 20px' : '40px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 255, 0.98) 100%)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(108, 99, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(108, 99, 255, 0.1)',
              }}
            >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: isMobile ? '24px' : '32px',
                marginBottom: '0',
                lineHeight: '1.55',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                textAlign: 'center',
              }}
            >
              <span style={{
                fontSize: isMobile ? '28px' : '36px',
              }}>
                💡
              </span>
              <span style={{
                background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                flex: 1,
              }}>
                {currentQuestion.text}
              </span>
            </motion.h2>

            <div style={{ 
              display: isMobile ? 'grid' : 'flex',
              gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'none',
              flexDirection: isMobile ? 'none' : 'row',
              flexWrap: isMobile ? 'none' : 'nowrap',
              gap: isMobile ? '10px' : '8px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: '48px',
            }}>
              {currentQuestion.options.map((option, index) => {
                // Mobile: 3-1-3 layout (first 3, middle 1 (Neutral at index 3), last 3)
                const isNeutralOption = index === 3; // Neutral is at index 3
                const shouldSpanFullWidth = isMobile && isNeutralOption;
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    whileHover={!autoAdvancing ? { 
                      scale: 1.05,
                      boxShadow: '0 6px 20px rgba(108, 99, 255, 0.4)',
                    } : {}}
                    whileTap={!autoAdvancing ? { scale: 0.95 } : {}}
                    disabled={autoAdvancing}
                    style={{
                      padding: isMobile ? '12px 8px' : '14px 12px',
                      border: selectedOption === index 
                        ? '2px solid #6c63ff' 
                        : '1px solid #e0e0e0',
                      borderRadius: '10px',
                      background: selectedOption === index
                        ? optionGradient
                        : '#ffffff',
                      cursor: autoAdvancing ? 'not-allowed' : 'pointer',
                      textAlign: 'center',
                      fontSize: isMobile ? '12px' : '14px',
                      fontWeight: selectedOption === index ? '600' : '500',
                      color: selectedOption === index ? '#333' : '#666',
                      transition: 'all 0.2s ease',
                      opacity: autoAdvancing ? 0.6 : 1,
                      boxShadow: selectedOption === index
                        ? '0 3px 12px rgba(108, 99, 255, 0.25)'
                        : '0 1px 4px rgba(0, 0, 0, 0.08)',
                      ...(isMobile 
                        ? {
                            gridColumn: shouldSpanFullWidth ? '1 / -1' : 'auto',
                            width: shouldSpanFullWidth ? 'auto' : '100%',
                            maxWidth: shouldSpanFullWidth ? '250px' : 'none',
                            margin: shouldSpanFullWidth ? '0 auto' : '0',
                          }
                        : {
                            flex: '1 1 0',
                            minWidth: '80px',
                            maxWidth: '140px',
                          }
                      ),
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>

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
                    : 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
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
                      : 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CreativeThinkingQuestionsPage;

