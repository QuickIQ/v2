import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, Answer } from '../../types';
import { ProgressRing } from '../ui/ProgressRing';
import { ChevronRight, Check } from 'lucide-react';
import '../../App.css';

interface Props {
  questions: Question[];
  answers: Answer[];
  onAnswerSelect: (questionId: number, optionKey: string) => void;
  onSubmit: () => void;
}

function EnhancedQuestionsPage({ questions, answers, onAnswerSelect, onSubmit }: Props) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find((a) => a.question_id === currentQuestion?.id);
  const progress = ((currentIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (currentAnswer) {
      setSelectedAnswer(currentAnswer.option_key);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentIndex, currentAnswer]);

  const handleOptionSelect = (optionKey: string) => {
    setSelectedAnswer(optionKey);
    if (currentQuestion) {
      onAnswerSelect(currentQuestion.id, optionKey);
    }
  };

  const handleNext = () => {
    if (selectedAnswer && currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    } else if (selectedAnswer && currentIndex === questions.length - 1) {
      onSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentQuestion) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="app" style={{ 
      minHeight: '100vh', 
      padding: '40px 20px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
        backgroundSize: '40px 40px',
        opacity: 0.3
      }} />

      <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
        {/* Progress Section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ 
            marginBottom: '40px',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '16px' }}>
            <ProgressRing progress={progress} size={100} color="#fff" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>
                {t('test.questions.question', { current: currentIndex + 1, total: questions.length })}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                Soru {currentIndex + 1}
              </div>
            </div>
          </div>
          <div style={{ 
            width: '100%', 
            height: '6px', 
            background: 'rgba(255,255,255,0.2)', 
            borderRadius: '3px', 
            overflow: 'hidden',
            marginTop: '16px'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                borderRadius: '3px',
              }}
            />
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <motion.div
              className="card"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '48px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.h2
                style={{
                  fontSize: '28px',
                  marginBottom: '40px',
                  color: '#333',
                  lineHeight: '1.4',
                  fontWeight: '600'
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentQuestion.text}
              </motion.h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentQuestion.options.map((option, idx) => (
                  <motion.button
                    key={option.key}
                    onClick={() => handleOptionSelect(option.key)}
                    style={{
                      padding: '20px 24px',
                      border: `3px solid ${selectedAnswer === option.key ? '#667eea' : '#e0e0e0'}`,
                      borderRadius: '16px',
                      background: selectedAnswer === option.key 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'white',
                      color: selectedAnswer === option.key ? 'white' : '#333',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '18px',
                      fontWeight: selectedAnswer === option.key ? '600' : '400',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: selectedAnswer === option.key 
                        ? '0 8px 24px rgba(102, 126, 234, 0.4)'
                        : '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <span>{option.text}</span>
                    {selectedAnswer === option.key && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Check size={24} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px' }}>
                <motion.button
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  style={{
                    background: currentIndex === 0 ? '#e0e0e0' : 'rgba(102, 126, 234, 0.1)',
                    color: currentIndex === 0 ? '#999' : '#667eea',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  }}
                  whileHover={currentIndex > 0 ? { scale: 1.05 } : {}}
                  whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
                >
                  {t('common.back')}
                </motion.button>

                <motion.button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  style={{
                    background: selectedAnswer 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : '#e0e0e0',
                    color: 'white',
                    border: 'none',
                    padding: '16px 48px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: selectedAnswer ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: selectedAnswer 
                      ? '0 8px 24px rgba(102, 126, 234, 0.4)'
                      : 'none',
                  }}
                  whileHover={selectedAnswer ? { scale: 1.05, y: -2 } : {}}
                  whileTap={selectedAnswer ? { scale: 0.95 } : {}}
                >
                  {currentIndex === questions.length - 1 ? t('common.submit') : t('common.next')}
                  {currentIndex < questions.length - 1 && (
                    <ChevronRight size={20} />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default EnhancedQuestionsPage;

