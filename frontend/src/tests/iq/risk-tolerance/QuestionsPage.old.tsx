import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useRiskToleranceTestStore, RiskToleranceQuestion, RiskToleranceAnswer } from '../../../store/riskToleranceTestStore';
import { useMobile } from '../../../hooks/useMobile';
import { Clock } from 'lucide-react';
import '../../../App.css';

interface Props {
  questions: RiskToleranceQuestion[];
  onComplete: () => void;
}

// Soft pastel gradient colors for answer buttons (red to green scale)
const answerGradients = [
  'linear-gradient(135deg, #f8b2b2, #f5a1a1)', // Never - soft red
  'linear-gradient(135deg, #f5a1a1, #f7c59f)', // Rarely - red to orange
  'linear-gradient(135deg, #f7c59f, #fff2dc)', // Sometimes - orange to cream
  'linear-gradient(135deg, #ffffff, #fefefe)', // Neutral - pure white
  'linear-gradient(135deg, #f4ffe5, #c8f8c8)', // Often - cream to light green
  'linear-gradient(135deg, #c8f8c8, #a4e8a4)', // Usually - light green to green
  'linear-gradient(135deg, #a4e8a4, #89dc89)', // Always - green to darker green
];

// Glow colors for hover effect (matching each button's color)
const glowColors = [
  'rgba(248, 178, 178, 0.5)', // Never - soft red glow
  'rgba(245, 161, 161, 0.5)', // Rarely - red-orange glow
  'rgba(247, 197, 159, 0.5)', // Sometimes - orange glow
  'rgba(255, 255, 255, 0.5)', // Neutral - white glow
  'rgba(200, 248, 200, 0.5)', // Often - light green glow
  'rgba(164, 232, 164, 0.5)', // Usually - green glow
  'rgba(137, 220, 137, 0.5)', // Always - darker green glow
];

function RiskToleranceQuestionsPage({ questions, onComplete }: Props) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const {
    currentQuestionIndex,
    timeRemaining,
    answers,
    setCurrentQuestionIndex,
    addAnswer,
    setTimeRemaining,
  } = useRiskToleranceTestStore();

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

    let currentTime = useRiskToleranceTestStore.getState().timeRemaining;
    
    if (!currentTime || currentTime <= 0 || currentTime > 10 * 60 || isNaN(currentTime)) {
      currentTime = 10 * 60;
      setTimeRemaining(currentTime);
    }

    if (currentTime <= 0) {
      onComplete();
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      const storeTime = useRiskToleranceTestStore.getState().timeRemaining;
      
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
    // Options order: ["Never", "Rarely", "Sometimes", "Neutral", "Often", "Usually", "Always"]
    // Reverse scoring is handled in calculateScore() in the store
    const baseScore = optionIndex + 1;
    
    const answer: RiskToleranceAnswer = {
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
        background: 'linear-gradient(135deg, #FFF0F0 0%, #FFE8E8 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#ff4444' }}>
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
        background: 'linear-gradient(135deg, #FFF0F0 0%, #FFE8E8 100%)',
        padding: '40px',
      }}>
        <div className="card" style={{
          maxWidth: '600px',
          padding: '40px',
          textAlign: 'center',
        }}>
          <div style={{ color: '#e74c3c', marginBottom: '20px' }}>
            {t('tests.riskTolerance.errors.load_questions') || 'Failed to load questions. Please try again.'}
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF0F0 0%, #FFE8E8 100%)',
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
            background: 'linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%)',
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
              position: 'relative',
            }}
          >
            {/* Developer Feature: Skip to Last Question - Top right corner */}
            {currentQuestionIndex < questions.length - 1 && (
              <motion.button
                onClick={handleSkipToLast}
                disabled={autoAdvancing}
                whileHover={!autoAdvancing ? { scale: 1.05 } : {}}
                whileTap={!autoAdvancing ? { scale: 0.95 } : {}}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
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
                  zIndex: 10,
                }}
                title="Developer: Skip to last question (will be removed)"
              >
                ⚡ Skip to 20
              </motion.button>
            )}

            {/* Risk Icon - Outside card, above */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: isMobile ? '40px' : '48px',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              📈
            </motion.div>

            {/* Question Card */}
            <div
              className="card"
              style={{
                width: '100%',
                padding: isMobile ? '30px 20px' : '40px',
                background: 'linear-gradient(135deg, rgba(255, 252, 245, 0.98) 0%, rgba(255, 250, 240, 0.95) 100%)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(255, 68, 68, 0.18), 0 0 60px rgba(255, 107, 107, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 68, 68, 0.3)',
              }}
            >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: isMobile ? '24px' : '32px',
                marginBottom: '32px',
                lineHeight: '1.55',
                fontWeight: '400',
                textAlign: 'center',
                color: '#1a1a1a',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
              }}
            >
              {currentQuestion.text}
            </motion.h2>

            <div style={{ 
              display: isMobile ? 'flex' : 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: 'nowrap',
              gap: isMobile ? '10px' : '12px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: isMobile ? '48px' : '80px',
            }}>
              {/* Reordered: Top row (Often, Usually, Always), Middle (Neutral), Bottom (Never, Rarely, Sometimes) */}
              {isMobile ? (
                <>
                  {/* Top row: Often, Usually, Always */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                    {[4, 5, 6].map((originalIndex) => {
                      const option = currentQuestion.options[originalIndex];
                      return (
                        <motion.button
                          key={originalIndex}
                          onClick={() => handleOptionSelect(originalIndex)}
                          whileHover={!autoAdvancing ? { 
                            y: -4,
                            boxShadow: `0 0 12px ${glowColors[originalIndex]}, 0 4px 18px rgba(0,0,0,0.1)`,
                            filter: 'brightness(1.06)',
                            transition: { duration: 0.12, ease: 'easeOut' }
                          } : {}}
                          whileTap={!autoAdvancing ? { scale: 0.98 } : {}}
                          disabled={autoAdvancing}
                          style={{
                            padding: '10px 14px',
                            border: 'none',
                            borderRadius: '12px',
                            background: answerGradients[originalIndex],
                            cursor: autoAdvancing ? 'not-allowed' : 'pointer',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#333',
                            transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
                            opacity: autoAdvancing ? 0.6 : 1,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                            position: 'relative',
                            zIndex: selectedOption === originalIndex ? 2 : 1,
                            minWidth: '100px',
                            flex: '1 1 0',
                            whiteSpace: 'nowrap',
                            overflow: 'visible',
                            textOverflow: 'clip',
                          }}
                        >
                          {option}
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  {/* Middle: Neutral */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                    <motion.button
                      key={3}
                      onClick={() => handleOptionSelect(3)}
                      whileHover={!autoAdvancing ? { 
                        y: -4,
                        boxShadow: `0 0 12px ${glowColors[3]}, 0 4px 18px rgba(0,0,0,0.1)`,
                        filter: 'brightness(1.06)',
                        transition: { duration: 0.12, ease: 'easeOut' }
                      } : {}}
                      whileTap={!autoAdvancing ? { scale: 0.98 } : {}}
                      disabled={autoAdvancing}
                      style={{
                        padding: '10px 14px',
                        border: 'none',
                        borderRadius: '12px',
                        background: answerGradients[3],
                        cursor: autoAdvancing ? 'not-allowed' : 'pointer',
                        textAlign: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#333',
                        transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
                        opacity: autoAdvancing ? 0.6 : 1,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        position: 'relative',
                        zIndex: selectedOption === 3 ? 2 : 1,
                        minWidth: '250px',
                        maxWidth: '250px',
                        whiteSpace: 'nowrap',
                        overflow: 'visible',
                        textOverflow: 'clip',
                      }}
                    >
                      {currentQuestion.options[3]}
                    </motion.button>
                  </div>
                  
                  {/* Bottom row: Never, Rarely, Sometimes */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                    {[0, 1, 2].map((originalIndex) => {
                      const option = currentQuestion.options[originalIndex];
                      return (
                        <motion.button
                          key={originalIndex}
                          onClick={() => handleOptionSelect(originalIndex)}
                          whileHover={!autoAdvancing ? { 
                            y: -4,
                            boxShadow: `0 0 12px ${glowColors[originalIndex]}, 0 4px 18px rgba(0,0,0,0.1)`,
                            filter: 'brightness(1.06)',
                            transition: { duration: 0.12, ease: 'easeOut' }
                          } : {}}
                          whileTap={!autoAdvancing ? { scale: 0.98 } : {}}
                          disabled={autoAdvancing}
                          style={{
                            padding: '10px 14px',
                            border: 'none',
                            borderRadius: '12px',
                            background: answerGradients[originalIndex],
                            cursor: autoAdvancing ? 'not-allowed' : 'pointer',
                            textAlign: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#333',
                            transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
                            opacity: autoAdvancing ? 0.6 : 1,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                            position: 'relative',
                            zIndex: selectedOption === originalIndex ? 2 : 1,
                            minWidth: '100px',
                            flex: '1 1 0',
                            whiteSpace: 'nowrap',
                            overflow: 'visible',
                            textOverflow: 'clip',
                          }}
                        >
                          {option}
                        </motion.button>
                      );
                    })}
                  </div>
                </>
              ) : (
                // Desktop: Original order (left to right)
                currentQuestion.options.map((option, index) => {
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      whileHover={!autoAdvancing ? { 
                        y: -4,
                        boxShadow: `0 0 12px ${glowColors[index]}, 0 4px 18px rgba(0,0,0,0.1)`,
                        filter: 'brightness(1.06)',
                        transition: { duration: 0.12, ease: 'easeOut' }
                      } : {}}
                      whileTap={!autoAdvancing ? { scale: 0.98 } : {}}
                      disabled={autoAdvancing}
                      style={{
                        padding: '12px 20px',
                        border: 'none',
                        borderRadius: '12px',
                        background: answerGradients[index],
                        cursor: autoAdvancing ? 'not-allowed' : 'pointer',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        transition: 'transform 0.12s ease-out, box-shadow 0.12s ease-out, filter 0.12s ease-out',
                        opacity: autoAdvancing ? 0.6 : 1,
                        boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                        position: 'relative',
                        zIndex: selectedOption === index ? 2 : 1,
                        flex: '1 1 0',
                        maxWidth: '150px',
                        whiteSpace: 'nowrap',
                        overflow: 'visible',
                        textOverflow: 'clip',
                      }}
                    >
                      {option}
                    </motion.button>
                  );
                })
              )}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: isMobile ? 'space-between' : 'space-between',
              alignItems: 'center',
              marginTop: '32px',
              gap: '16px',
              position: 'relative',
              padding: isMobile ? '16px 20px' : '20px 24px',
              background: 'linear-gradient(135deg, rgba(255, 252, 245, 0.98) 0%, rgba(255, 250, 240, 0.95) 100%)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(255, 68, 68, 0.18), 0 0 60px rgba(255, 107, 107, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 68, 68, 0.3)',
            }}>
              <motion.button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0 || autoAdvancing}
                whileHover={currentQuestionIndex > 0 && !autoAdvancing ? { scale: 1.05 } : {}}
                whileTap={currentQuestionIndex > 0 && !autoAdvancing ? { scale: 0.95 } : {}}
                style={{
                  padding: isMobile ? '12px 24px' : '14px 28px',
                  background: currentQuestionIndex === 0 || autoAdvancing
                    ? 'rgba(200, 200, 200, 0.3)'
                    : 'linear-gradient(135deg, rgba(255, 250, 240, 0.95) 0%, rgba(255, 245, 230, 0.98) 100%)',
                  border: '1px solid rgba(255, 68, 68, 0.35)',
                  borderRadius: '12px',
                  color: currentQuestionIndex === 0 || autoAdvancing ? '#999' : '#1a1a1a',
                  fontWeight: '600',
                  fontSize: isMobile ? '14px' : '16px',
                  cursor: currentQuestionIndex === 0 || autoAdvancing ? 'not-allowed' : 'pointer',
                  opacity: currentQuestionIndex === 0 || autoAdvancing ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: currentQuestionIndex === 0 || autoAdvancing ? 'none' : '0 2px 8px rgba(255, 68, 68, 0.25)',
                }}
              >
                {t('common.back') || 'Previous'}
              </motion.button>

              {/* Timer in the middle on mobile - Centered between Back and Next, below Rarely */}
              {isMobile && (
                <motion.div
                  className="timer-container"
                  animate={{
                    scale: timeRemaining <= 180 ? [1, 1.05, 1] : 1,
                    boxShadow: timeRemaining <= 180 
                      ? [
                          '0 0 0 0 rgba(231, 76, 60, 0.4)',
                          '0 0 0 8px rgba(231, 76, 60, 0)',
                          '0 0 0 0 rgba(231, 76, 60, 0)',
                        ]
                      : undefined,
                  }}
                  transition={{
                    duration: timeRemaining <= 180 ? 1.5 : 0,
                    repeat: timeRemaining <= 180 ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: timeRemaining <= 180 
                      ? 'rgba(231, 76, 60, 0.2)' 
                      : 'linear-gradient(135deg, rgba(255, 252, 245, 0.98) 0%, rgba(255, 250, 240, 0.95) 100%)',
                    borderRadius: '10px',
                    border: `2px solid ${timeRemaining <= 180 ? '#e74c3c' : 'rgba(255, 68, 68, 0.35)'}`,
                    boxShadow: timeRemaining <= 180 
                      ? '0 4px 20px rgba(231, 76, 60, 0.3)' 
                      : '0 2px 8px rgba(255, 68, 68, 0.18)',
                    transition: 'all 0.3s ease',
                    position: 'absolute',
                    left: '38.5%',
                    top: '8px',
                    transform: 'translateX(-50%)',
                    zIndex: 5,
                    margin: 0,
                    fontSize: '0.9rem',
                  }}
                >
                  <Clock 
                    size={16} 
                    style={{ 
                      color: timeRemaining <= 180 ? '#e74c3c' : '#1a1a1a',
                    }} 
                  />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: timeRemaining <= 180 ? '#e74c3c' : '#1a1a1a',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                  }}>
                    {formatTime(timeRemaining)}
                  </span>
                </motion.div>
              )}

              {currentQuestionIndex < questions.length - 1 && (
                <motion.button
                  onClick={handleNextQuestion}
                  disabled={!currentAnswer || autoAdvancing}
                  whileHover={currentAnswer && !autoAdvancing ? { scale: 1.05 } : {}}
                  whileTap={currentAnswer && !autoAdvancing ? { scale: 0.95 } : {}}
                  style={{
                    padding: isMobile ? '12px 24px' : '14px 28px',
                    background: !currentAnswer || autoAdvancing
                      ? 'rgba(100, 100, 100, 0.3)'
                      : 'linear-gradient(135deg, #ff4444 0%, #ff6b6b 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: !currentAnswer || autoAdvancing ? '#999' : 'white',
                    fontWeight: '600',
                    fontSize: isMobile ? '14px' : '16px',
                    cursor: !currentAnswer || autoAdvancing ? 'not-allowed' : 'pointer',
                    opacity: !currentAnswer || autoAdvancing ? 0.5 : 1,
                    transition: 'all 0.3s ease',
                    marginLeft: isMobile ? '0' : 'auto',
                  }}
                >
                  {t('common.next') || 'Next'}
                </motion.button>
              )}
            </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Header: Risk Tolerance Test + Question Progress + Timer - Below the card - Fixed, no animation */}
        <div
          style={{
            width: '100%',
            padding: isMobile ? '16px 20px' : '20px 24px',
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            background: 'linear-gradient(135deg, rgba(255, 252, 245, 0.98) 0%, rgba(255, 250, 240, 0.95) 100%)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(255, 68, 68, 0.18), 0 0 60px rgba(255, 107, 107, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 68, 68, 0.3)',
          }}
        >
              <div style={{ 
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: '600',
                color: '#1a1a1a',
              }}>
                Risk Tolerance Test
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}>
                {/* Question Progress Indicator - Left of Timer */}
                <div
                  style={{
                    padding: isMobile ? '6px 10px' : '8px 14px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#1a1a1a',
                    fontSize: isMobile ? '12px' : '14px',
                    fontWeight: '600',
                  }}>
                    <span style={{
                      fontSize: isMobile ? '14px' : '16px',
                    }}>
                      {currentQuestionIndex + 1}
                    </span>
                    <span style={{
                      opacity: 0.6,
                    }}>
                      /
                    </span>
                    <span style={{
                      opacity: 0.6,
                    }}>
                      {questions.length}
                    </span>
                  </div>
                </div>

                {/* Timer - Hidden on mobile */}
                <div
                  className="bottom-timer"
                  style={{
                    display: isMobile ? 'none' : 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: timeRemaining <= 180 
                      ? 'rgba(231, 76, 60, 0.2)' 
                      : 'linear-gradient(135deg, rgba(255, 252, 245, 0.98) 0%, rgba(255, 250, 240, 0.95) 100%)',
                    borderRadius: '12px',
                    border: `2px solid ${timeRemaining <= 180 ? '#e74c3c' : 'rgba(255, 68, 68, 0.35)'}`,
                    boxShadow: timeRemaining <= 180 
                      ? '0 4px 20px rgba(231, 76, 60, 0.3)' 
                      : '0 2px 8px rgba(255, 68, 68, 0.18)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Clock 
                    size={20} 
                    style={{ 
                      color: timeRemaining <= 180 ? '#e74c3c' : '#1a1a1a',
                    }} 
                  />
                  <span style={{
                    fontSize: isMobile ? '18px' : '20px',
                    fontWeight: 'bold',
                    color: timeRemaining <= 180 ? '#e74c3c' : '#1a1a1a',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                  }}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>

              </div>
        </div>
      </div>
    </div>
  );
}

export default RiskToleranceQuestionsPage;



