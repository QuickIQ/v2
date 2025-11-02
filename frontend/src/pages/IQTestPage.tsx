import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Q1 from "../iqtestv2/Q1.svg";
import A1 from "../iqtestv2/A1.svg";
import A2 from "../iqtestv2/A2.svg";
import A3 from "../iqtestv2/A3.svg";
import A4 from "../iqtestv2/A4.svg";
import A5 from "../iqtestv2/A5.svg";
import A6 from "../iqtestv2/A6.svg";
import { useMobile } from '../hooks/useMobile';

function IQTestPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const isMobile = useMobile();

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
    setSelectedAnswer(answerKey);
  };

  const handleNext = () => {
    // Placeholder logic
    console.log('Next question - selected:', selectedAnswer);
  };

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
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <div style={{
            fontSize: isMobile ? '36px' : '48px',
            fontWeight: 'bold',
            color: timeRemaining <= 60 ? '#e74c3c' : '#333',
            fontFamily: 'monospace',
            letterSpacing: '2px',
          }}>
            {formatTime(timeRemaining)}
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
              src={Q1}
              alt="Question 1"
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
              { key: 'A', svg: A1 },
              { key: 'B', svg: A2 },
              { key: 'C', svg: A3 },
              { key: 'D', svg: A4 },
              { key: 'E', svg: A5 },
              { key: 'F', svg: A6 },
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
                      maxWidth: isMobile ? '150px' : '200px',
                      background: 'transparent',
                      border: selectedAnswer === option.key
                        ? '3px solid #667eea'
                        : '3px solid transparent',
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

            {/* Next Button - Right below answers */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}>
              <motion.button
                onClick={handleNext}
                disabled={!selectedAnswer}
                whileHover={selectedAnswer ? { scale: 1.05 } : {}}
                whileTap={selectedAnswer ? { scale: 0.95 } : {}}
                style={{
                  background: selectedAnswer
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#e0e0e0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: isMobile ? '12px 32px' : '16px 48px',
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '600',
                  cursor: selectedAnswer ? 'pointer' : 'not-allowed',
                  boxShadow: selectedAnswer
                    ? '0 4px 16px rgba(102, 126, 234, 0.3)'
                    : 'none',
                  opacity: selectedAnswer ? 1 : 0.6,
                }}
              >
                Next
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default IQTestPage;

