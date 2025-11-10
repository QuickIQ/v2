import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMobile } from '../hooks/useMobile';
import { IqImage } from '../components/ui/IqImage';

// Import question and answer images
// Q1
import Q1 from "../iqtestv2/Visual/Q1/Q1.svg";
import Q1A1 from "../iqtestv2/Visual/Q1/Q1A1.svg";
import Q1A2 from "../iqtestv2/Visual/Q1/Q1A2.svg";
import Q1A3 from "../iqtestv2/Visual/Q1/Q1A3.svg";
import Q1A4 from "../iqtestv2/Visual/Q1/Q1A4.svg";
import Q1A5 from "../iqtestv2/Visual/Q1/Q1A5.svg";
import Q1A6 from "../iqtestv2/Visual/Q1/Q1A6.svg";

// Q2
import Q2 from "../iqtestv2/Visual/Q2/Q2.svg";
import Q2A1 from "../iqtestv2/Visual/Q2/Q2A1.svg";
import Q2A2 from "../iqtestv2/Visual/Q2/Q2A2.svg";
import Q2A3 from "../iqtestv2/Visual/Q2/Q2A3.svg";
import Q2A4 from "../iqtestv2/Visual/Q2/Q2A4.svg";
import Q2A5 from "../iqtestv2/Visual/Q2/Q2A5.svg";
import Q2A6 from "../iqtestv2/Visual/Q2/Q2A6.svg";

// Q3
import Q3 from "../iqtestv2/Visual/Q3/Q3.svg";
import Q3A1 from "../iqtestv2/Visual/Q3/Q3A1.svg";
import Q3A2 from "../iqtestv2/Visual/Q3/Q3A2.svg";
import Q3A3 from "../iqtestv2/Visual/Q3/Q3A3.svg";
import Q3A4 from "../iqtestv2/Visual/Q3/Q3A4.svg";
import Q3A5 from "../iqtestv2/Visual/Q3/Q3A5.svg";
import Q3A6 from "../iqtestv2/Visual/Q3/Q3A6.svg";

// Q4
import Q4 from "../iqtestv2/Visual/Q4/Q4.svg";
import Q4A1 from "../iqtestv2/Visual/Q4/Q4A1.svg";
import Q4A2 from "../iqtestv2/Visual/Q4/Q4A2.svg";
import Q4A3 from "../iqtestv2/Visual/Q4/Q4A3.svg";
import Q4A4 from "../iqtestv2/Visual/Q4/Q4A4.svg";
import Q4A5 from "../iqtestv2/Visual/Q4/Q4A5.svg";
import Q4A6 from "../iqtestv2/Visual/Q4/Q4A6.svg";

// Q5
import Q5 from "../iqtestv2/Visual/Q5/Q5.svg";
import Q5A1 from "../iqtestv2/Visual/Q5/Q5A1.svg";
import Q5A2 from "../iqtestv2/Visual/Q5/Q5A2.svg";
import Q5A3 from "../iqtestv2/Visual/Q5/Q5A3.svg";
import Q5A4 from "../iqtestv2/Visual/Q5/Q5A4.svg";
import Q5A5 from "../iqtestv2/Visual/Q5/Q5A5.svg";
import Q5A6 from "../iqtestv2/Visual/Q5/Q5A6.svg";

// Q6
import Q6 from "../iqtestv2/Visual/Q6/Q6.svg";
import Q6A1 from "../iqtestv2/Visual/Q6/Q6A1.svg";
import Q6A2 from "../iqtestv2/Visual/Q6/Q6A2.svg";
import Q6A3 from "../iqtestv2/Visual/Q6/Q6A3.svg";
import Q6A4 from "../iqtestv2/Visual/Q6/Q6A4.svg";
import Q6A5 from "../iqtestv2/Visual/Q6/Q6A5.svg";
import Q6A6 from "../iqtestv2/Visual/Q6/Q6A6.svg";

// Q7
import Q7 from "../iqtestv2/Visual/Q7/Q7.svg";
import Q7A1 from "../iqtestv2/Visual/Q7/Q7A1.svg";
import Q7A2 from "../iqtestv2/Visual/Q7/Q7A2.svg";
import Q7A3 from "../iqtestv2/Visual/Q7/Q7A3.svg";
import Q7A4 from "../iqtestv2/Visual/Q7/Q7A4.svg";
import Q7A5 from "../iqtestv2/Visual/Q7/Q7A5.svg";
import Q7A6 from "../iqtestv2/Visual/Q7/Q7A6.svg";

// Q8
import Q8 from "../iqtestv2/Visual/Q8/Q8.svg";
import Q8A1 from "../iqtestv2/Visual/Q8/Q8A1.svg";
import Q8A2 from "../iqtestv2/Visual/Q8/Q8A2.svg";
import Q8A3 from "../iqtestv2/Visual/Q8/Q8A3.svg";
import Q8A4 from "../iqtestv2/Visual/Q8/Q8A4.svg";
import Q8A5 from "../iqtestv2/Visual/Q8/Q8A5.svg";
import Q8A6 from "../iqtestv2/Visual/Q8/Q8A6.svg";

// Q9
import Q9 from "../iqtestv2/Visual/Q9/Q9.svg";
import Q9A1 from "../iqtestv2/Visual/Q9/Q9A1.svg";
import Q9A2 from "../iqtestv2/Visual/Q9/Q9A2.svg";
import Q9A3 from "../iqtestv2/Visual/Q9/Q9A3.svg";
import Q9A4 from "../iqtestv2/Visual/Q9/Q9A4.svg";
import Q9A5 from "../iqtestv2/Visual/Q9/Q9A5.svg";
import Q9A6 from "../iqtestv2/Visual/Q9/Q9A6.svg";

// Q10
import Q10 from "../iqtestv2/Visual/Q10/Q10.svg";
import Q10A1 from "../iqtestv2/Visual/Q10/Q10A1.svg";
import Q10A2 from "../iqtestv2/Visual/Q10/Q10A2.svg";
import Q10A3 from "../iqtestv2/Visual/Q10/Q10A3.svg";
import Q10A4 from "../iqtestv2/Visual/Q10/Q10A4.svg";
import Q10A5 from "../iqtestv2/Visual/Q10/Q10A5.svg";
import Q10A6 from "../iqtestv2/Visual/Q10/Q10A6.svg";

// Q11
import Q11 from "../iqtestv2/Visual/Q11/Q11.svg";
import Q11A1 from "../iqtestv2/Visual/Q11/Q11A1.svg";
import Q11A2 from "../iqtestv2/Visual/Q11/Q11A2.svg";
import Q11A3 from "../iqtestv2/Visual/Q11/Q11A3.svg";
import Q11A4 from "../iqtestv2/Visual/Q11/Q11A4.svg";
import Q11A5 from "../iqtestv2/Visual/Q11/Q11A5.svg";
import Q11A6 from "../iqtestv2/Visual/Q11/Q11A6.svg";

// Q12
import Q12 from "../iqtestv2/Visual/Q12/Q12.svg";
import Q12A1 from "../iqtestv2/Visual/Q12/Q12A1.svg";
import Q12A2 from "../iqtestv2/Visual/Q12/Q12A2.svg";
import Q12A3 from "../iqtestv2/Visual/Q12/Q12A3.svg";
import Q12A4 from "../iqtestv2/Visual/Q12/Q12A4.svg";
import Q12A5 from "../iqtestv2/Visual/Q12/Q12A15.svg";
import Q12A6 from "../iqtestv2/Visual/Q12/Q12A6.svg";

// Q13
import Q13 from "../iqtestv2/Visual/Q13/Q13.svg";
import Q13A1 from "../iqtestv2/Visual/Q13/Q13A1.svg";
import Q13A2 from "../iqtestv2/Visual/Q13/Q13A2.svg";
import Q13A3 from "../iqtestv2/Visual/Q13/Q13A3.svg";
import Q13A4 from "../iqtestv2/Visual/Q13/Q13A4.svg";
import Q13A5 from "../iqtestv2/Visual/Q13/Q13A5.svg";
import Q13A6 from "../iqtestv2/Visual/Q13/Q13A6.svg";

// Q14
import Q14 from "../iqtestv2/Visual/Q14/Q14.svg";
import Q14A1 from "../iqtestv2/Visual/Q14/Q14A1.svg";
import Q14A2 from "../iqtestv2/Visual/Q14/Q14A2.svg";
import Q14A3 from "../iqtestv2/Visual/Q14/Q14A3.svg";
import Q14A4 from "../iqtestv2/Visual/Q14/Q14A4.svg";
import Q14A5 from "../iqtestv2/Visual/Q14/Q14A5.svg";
import Q14A6 from "../iqtestv2/Visual/Q14/Q14A6.svg";

// Q15
import Q15 from "../iqtestv2/Visual/Q15/Q15.svg";
import Q15A1 from "../iqtestv2/Visual/Q15/Q15A1.svg";
import Q15A2 from "../iqtestv2/Visual/Q15/Q15A2.svg";
import Q15A3 from "../iqtestv2/Visual/Q15/Q15A3.svg";
import Q15A4 from "../iqtestv2/Visual/Q15/Q15A4.svg";
import Q15A5 from "../iqtestv2/Visual/Q15/Q15A5.svg";
import Q15A6 from "../iqtestv2/Visual/Q15/Q15A6.svg";

// Q16
import Q16 from "../iqtestv2/Visual/Q16/Q16.svg";
import Q16A1 from "../iqtestv2/Visual/Q16/Q16A1.svg";
import Q16A2 from "../iqtestv2/Visual/Q16/Q16A2.svg";
import Q16A3 from "../iqtestv2/Visual/Q16/Q16A3.svg";
import Q16A4 from "../iqtestv2/Visual/Q16/Q16A4.svg";
import Q16A5 from "../iqtestv2/Visual/Q16/Q16A5.svg";
import Q16A6 from "../iqtestv2/Visual/Q16/Q16A6.svg";

// Q17
import Q17 from "../iqtestv2/Visual/Q17/Q17.svg";
import Q17A1 from "../iqtestv2/Visual/Q17/Q17A1.svg";
import Q17A2 from "../iqtestv2/Visual/Q17/Q17A2.svg";
import Q17A3 from "../iqtestv2/Visual/Q17/Q17A3.svg";
import Q17A4 from "../iqtestv2/Visual/Q17/Q17A4.svg";
import Q17A5 from "../iqtestv2/Visual/Q17/Q17A5.svg";
import Q17A6 from "../iqtestv2/Visual/Q17/Q17A6.svg";

// Q18
import Q18 from "../iqtestv2/Visual/Q18/Q18.svg";
import Q18A1 from "../iqtestv2/Visual/Q18/Q18A1.svg";
import Q18A2 from "../iqtestv2/Visual/Q18/Q18A2.svg";
import Q18A3 from "../iqtestv2/Visual/Q18/Q18A3.svg";
import Q18A4 from "../iqtestv2/Visual/Q18/Q18A4.svg";
import Q18A5 from "../iqtestv2/Visual/Q18/Q18A5.svg";
import Q18A6 from "../iqtestv2/Visual/Q18/Q18A6.svg";

// Q19
import Q19 from "../iqtestv2/Visual/Q19/Q19.svg";
import Q19A1 from "../iqtestv2/Visual/Q19/Q19A1.svg";
import Q19A2 from "../iqtestv2/Visual/Q19/Q19A2.svg";
import Q19A3 from "../iqtestv2/Visual/Q19/Q19A3.svg";
import Q19A4 from "../iqtestv2/Visual/Q19/Q19A4.svg";
import Q19A5 from "../iqtestv2/Visual/Q19/Q19A5.svg";
import Q19A6 from "../iqtestv2/Visual/Q19/Q19A6.svg";

function IQTestPage() {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const isMobile = useMobile();
  const totalQuestions = 19;

  // Dynamic question and answer mapping
  const getQuestionImage = (questionNum: number) => {
    const questionMap: { [key: number]: string } = {
      1: Q1,
      2: Q2,
      3: Q3,
      4: Q4,
      5: Q5,
      6: Q6,
      7: Q7,
      8: Q8,
      9: Q9,
      10: Q10,
      11: Q11,
      12: Q12,
      13: Q13,
      14: Q14,
      15: Q15,
      16: Q16,
      17: Q17,
      18: Q18,
      19: Q19,
    };
    return questionMap[questionNum] || Q1;
  };

  const getAnswerImages = (questionNum: number) => {
    const answerMap: { [key: number]: string[] } = {
      1: [Q1A1, Q1A2, Q1A3, Q1A4, Q1A5, Q1A6],
      2: [Q2A1, Q2A2, Q2A3, Q2A4, Q2A5, Q2A6],
      3: [Q3A1, Q3A2, Q3A3, Q3A4, Q3A5, Q3A6],
      4: [Q4A1, Q4A2, Q4A3, Q4A4, Q4A5, Q4A6],
      5: [Q5A1, Q5A2, Q5A3, Q5A4, Q5A5, Q5A6],
      6: [Q6A1, Q6A2, Q6A3, Q6A4, Q6A5, Q6A6],
      7: [Q7A1, Q7A2, Q7A3, Q7A4, Q7A5, Q7A6],
      8: [Q8A1, Q8A2, Q8A3, Q8A4, Q8A5, Q8A6],
      9: [Q9A1, Q9A2, Q9A3, Q9A4, Q9A5, Q9A6],
      10: [Q10A1, Q10A2, Q10A3, Q10A4, Q10A5, Q10A6],
      11: [Q11A1, Q11A2, Q11A3, Q11A4, Q11A5, Q11A6],
      12: [Q12A1, Q12A2, Q12A3, Q12A4, Q12A5, Q12A6],
      13: [Q13A1, Q13A2, Q13A3, Q13A4, Q13A5, Q13A6],
      14: [Q14A1, Q14A2, Q14A3, Q14A4, Q14A5, Q14A6],
      15: [Q15A1, Q15A2, Q15A3, Q15A4, Q15A5, Q15A6],
      16: [Q16A1, Q16A2, Q16A3, Q16A4, Q16A5, Q16A6],
      17: [Q17A1, Q17A2, Q17A3, Q17A4, Q17A5, Q17A6],
      18: [Q18A1, Q18A2, Q18A3, Q18A4, Q18A5, Q18A6],
      19: [Q19A1, Q19A2, Q19A3, Q19A4, Q19A5, Q19A6],
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
      padding: isMobile ? '20px' : '40px',
      paddingTop: isMobile ? '80px' : '100px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Header with Question Number and Timer */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '1200px',
          marginBottom: isMobile ? '30px' : '40px',
          padding: isMobile ? '0 10px' : '0',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '600',
            color: '#667eea',
          }}>
            {t('test.iq.question', { current: currentQuestion, total: totalQuestions })}
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

      {/* Main Test Container - Question and Answers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="test-container"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? '40px' : '60px',
          width: '100%',
          maxWidth: '1200px',
          padding: isMobile ? '20px' : '40px',
          margin: '0 auto',
        }}
      >
        {/* Question Area - Left Side (Desktop) / Top (Mobile) */}
        <div 
          className="question-area"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: isMobile ? '100%' : '50%',
            maxWidth: isMobile ? '90vw' : '700px',
            flex: isMobile ? '0 0 auto' : '1',
          }}
        >
          <IqImage
            src={currentQuestionImage}
            alt={t('test.iq.question', { current: currentQuestion, total: totalQuestions })}
            isQuestion={true}
          />
        </div>

        {/* Answer Options - Right Side (Desktop) / Bottom (Mobile), 3x2 Grid */}
        <div 
          className="answer-area"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gridTemplateRows: isMobile ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
            gap: isMobile ? '20px' : '28px',
            width: isMobile ? '100%' : '40%',
            maxWidth: isMobile ? '100%' : '500px',
            justifyContent: 'center',
            alignItems: 'center',
            flex: isMobile ? '0 0 auto' : '1',
          }}
        >
          {[
            { key: 'A', svg: currentAnswerImages[0] },
            { key: 'B', svg: currentAnswerImages[1] },
            { key: 'C', svg: currentAnswerImages[2] },
            { key: 'D', svg: currentAnswerImages[3] },
            { key: 'E', svg: currentAnswerImages[4] },
            { key: 'F', svg: currentAnswerImages[5] },
          ].map((option) => (
            <motion.button
              key={option.key}
              onClick={() => handleAnswerSelect(option.key)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: '12px',
                padding: isMobile ? '8px' : '10px',
                cursor: 'pointer',
                boxShadow: selectedAnswer === option.key
                  ? '0 8px 24px rgba(102, 126, 234, 0.4)'
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '30vw' : '100%',
                minWidth: isMobile ? '100px' : 'auto',
                maxWidth: isMobile ? '160px' : '180px',
                aspectRatio: '1',
              }}
            >
              <IqImage
                src={option.svg}
                alt={`${t('test.questions.answer')} ${option.key}`}
                isQuestion={false}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default IQTestPage;



