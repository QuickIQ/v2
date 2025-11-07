import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

// Import question and answer images
import Q1Easy1 from "../iqtestv2/Visual/Q1Easy1.svg";
import Q1A1 from "../iqtestv2/Visual/Q1A1.svg";
import Q1A2 from "../iqtestv2/Visual/Q1A2.svg";
import Q1A3 from "../iqtestv2/Visual/Q1A3.svg";
import Q1A4 from "../iqtestv2/Visual/Q1A4.svg";
import Q1A5 from "../iqtestv2/Visual/Q1A5.svg";
import Q1A6 from "../iqtestv2/Visual/Q1A6.svg";

import Q2Easy2 from "../iqtestv2/Visual/Q2Easy2.svg";
import Q2A1 from "../iqtestv2/Visual/Q2A1.svg";
import Q2A2 from "../iqtestv2/Visual/Q2A2.svg";
import Q2A3 from "../iqtestv2/Visual/Q2A3.svg";
import Q2A4 from "../iqtestv2/Visual/Q2A4.svg";
import Q2A5 from "../iqtestv2/Visual/Q2A5.svg";
import Q2A6 from "../iqtestv2/Visual/Q2A6.svg";

function IQTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1); // Current question number
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const isMobile = useMobile();

  // Dynamic question and answer mapping
  const getQuestionImage = (questionNum: number) => {
    const questionMap: { [key: number]: string } = {
      1: Q1Easy1,
      2: Q2Easy2,
      // Add more questions here as they're added
      // 3: Q3Easy1,
    };
    return questionMap[questionNum] || Q1Easy1;
  };

  const getAnswerImages = (questionNum: number) => {
    const answerMap: { [key: number]: string[] } = {
      1: [Q1A1, Q1A2, Q1A3, Q1A4, Q1A5, Q1A6],
      2: [Q2A1, Q2A2, Q2A3, Q2A4, Q2A5, Q2A6],
      // Add more questions here as they're added
      // 3: [Q3A1, Q3A2, Q3A3, Q3A4, Q3A5, Q3A6],
    };
    return answerMap[questionNum] || [Q1A1, Q1A2, Q1A3, Q1A4, Q1A5, Q1A6];
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerKey: string) => {
    // Set selected answer for visual feedback
    setSelectedAnswer(answerKey);
    
    // Save the answer (you can add logic to store answers here)
    console.log(`Question ${currentQuestion} - selected:`, answerKey);
    
    // Automatically move to next question after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null); // Reset selection for next question
    }, 300); // 300ms delay to show selection feedback
  };

  // Get current question and answer images
  const currentQuestionImage = getQuestionImage(currentQuestion);
  const currentAnswerImages = getAnswerImages(currentQuestion);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: isMobile ? '20px 10px' : '40px 20px',
      paddingTop: isMobile ? '80px' : '120px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginBottom: '40px',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            padding: isMobile ? '0 10px' : '0',
          }}>
            <div style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: '600',
              color: '#667eea',
            }}>
              Question {currentQuestion} / 25
            </div>
            <div style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: 'bold',
              color: timeRemaining <= 60 ? '#e74c3c' : '#333',
              fontFamily: 'monospace',
              letterSpacing: '2px',
            }}>
              {formatTime(timeRemaining)}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '20px' : '30px',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minHeight: isMobile ? 'auto' : '500px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {/* Question Image - Left Side, No Background */}
          <div style={{
            flex: '1',
            maxWidth: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img
              src={currentQuestionImage}
              alt={`Question ${currentQuestion}`}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
              }}
            />
          </div>

          {/* Answer Options - Right Side, 2x3 Grid */}
          <div style={{
            flex: '1',
            maxWidth: '500px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '12px' : '17px',
            alignItems: 'center',
            marginTop: isMobile ? '0' : '30px',
          }}>
            {[
              { key: 'A', svg: currentAnswerImages[0] },
              { key: 'B', svg: currentAnswerImages[1] },
              { key: 'C', svg: currentAnswerImages[2] },
              { key: 'D', svg: currentAnswerImages[3] },
              { key: 'E', svg: currentAnswerImages[4] },
              { key: 'F', svg: currentAnswerImages[5] },
            ].reduce((acc, option, index) => {
              if (index % 2 === 0) {
                acc.push([option]);
              } else {
                acc[acc.length - 1].push(option);
              }
              return acc;
            }, [] as Array<Array<{ key: string; svg: string }>>).map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: 'flex',
                  gap: isMobile ? '12px' : '20px',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                {row.map((option) => (
                  <motion.button
                    key={option.key}
                    onClick={() => handleAnswerSelect(option.key)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    style={{
                      flex: '1',
                      maxWidth: isMobile ? '110px' : '145px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '12px',
                      padding: isMobile ? '8px' : '10px',
                      cursor: 'pointer',
                      boxShadow: selectedAnswer === option.key
                        ? '0 8px 24px rgba(102, 126, 234, 0.3)'
                        : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={option.svg}
                      alt={`Answer ${option.key}`}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default IQTestPage;

