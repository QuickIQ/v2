import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../hooks/useMobile';

// Import question and answer images
import Q1 from "../iqtestv2/Visual/Q1/Q1.svg";
import Q1A1 from "../iqtestv2/Visual/Q1/Q1A1.svg";
import Q1A2 from "../iqtestv2/Visual/Q1/Q1A2.svg";
import Q1A3 from "../iqtestv2/Visual/Q1/Q1A3.svg";
import Q1A4 from "../iqtestv2/Visual/Q1/Q1A4.svg";
import Q1A5 from "../iqtestv2/Visual/Q1/Q1A5.svg";
import Q1A6 from "../iqtestv2/Visual/Q1/Q1A6.svg";

import Q2 from "../iqtestv2/Visual/Q2/Q2.svg";
import Q2A1 from "../iqtestv2/Visual/Q2/Q2A1.svg";
import Q2A2 from "../iqtestv2/Visual/Q2/Q2A2.svg";
import Q2A3 from "../iqtestv2/Visual/Q2/Q2A3.svg";
import Q2A4 from "../iqtestv2/Visual/Q2/Q2A4.svg";
import Q2A5 from "../iqtestv2/Visual/Q2/Q2A5.svg";
import Q2A6 from "../iqtestv2/Visual/Q2/Q2A6.svg";

import Q3 from "../iqtestv2/Visual/Q3/Q3.svg";
import Q3A1 from "../iqtestv2/Visual/Q3/Q3A1.svg";
import Q3A2 from "../iqtestv2/Visual/Q3/Q3A2.svg";
import Q3A3 from "../iqtestv2/Visual/Q3/Q3A3.svg";
import Q3A4 from "../iqtestv2/Visual/Q3/Q3A4.svg";
import Q3A5 from "../iqtestv2/Visual/Q3/Q3A5.svg";
import Q3A6 from "../iqtestv2/Visual/Q3/Q3A6.svg";

import Q4 from "../iqtestv2/Visual/Q4/Q4.svg";
import Q4A1 from "../iqtestv2/Visual/Q4/Q4A1.svg";
import Q4A2 from "../iqtestv2/Visual/Q4/Q4A2.svg";
import Q4A3 from "../iqtestv2/Visual/Q4/Q4A3.svg";
import Q4A4 from "../iqtestv2/Visual/Q4/Q4A4.svg";
import Q4A5 from "../iqtestv2/Visual/Q4/Q4A5.svg";
import Q4A6 from "../iqtestv2/Visual/Q4/Q4A6.svg";

import Q5 from "../iqtestv2/Visual/Q5/Q5.svg";
import Q5A1 from "../iqtestv2/Visual/Q5/Q5A1.svg";
import Q5A2 from "../iqtestv2/Visual/Q5/Q5A2.svg";
import Q5A3 from "../iqtestv2/Visual/Q5/Q5A3.svg";
import Q5A4 from "../iqtestv2/Visual/Q5/Q5A4.svg";
import Q5A5 from "../iqtestv2/Visual/Q5/Q5A5.svg";
import Q5A6 from "../iqtestv2/Visual/Q5/Q5A6.svg";

import Q6 from "../iqtestv2/Visual/Q6/Q6.svg";
import Q6A1 from "../iqtestv2/Visual/Q6/Q6A1.svg";
import Q6A2 from "../iqtestv2/Visual/Q6/Q6A2.svg";
import Q6A3 from "../iqtestv2/Visual/Q6/Q6A3.svg";
import Q6A4 from "../iqtestv2/Visual/Q6/Q6A4.svg";
import Q6A5 from "../iqtestv2/Visual/Q6/Q6A5.svg";
import Q6A6 from "../iqtestv2/Visual/Q6/Q6A6.svg";

import Q7 from "../iqtestv2/Visual/Q7/Q7.svg";
import Q7A1 from "../iqtestv2/Visual/Q7/Q7A1.svg";
import Q7A2 from "../iqtestv2/Visual/Q7/Q7A2.svg";
import Q7A3 from "../iqtestv2/Visual/Q7/Q7A3.svg";
import Q7A4 from "../iqtestv2/Visual/Q7/Q7A4.svg";
import Q7A5 from "../iqtestv2/Visual/Q7/Q7A5.svg";
import Q7A6 from "../iqtestv2/Visual/Q7/Q7A6.svg";

import Q8 from "../iqtestv2/Visual/Q8/Q8.svg";
import Q8A1 from "../iqtestv2/Visual/Q8/Q8A1.svg";
import Q8A2 from "../iqtestv2/Visual/Q8/Q8A2.svg";
import Q8A3 from "../iqtestv2/Visual/Q8/Q8A3.svg";
import Q8A4 from "../iqtestv2/Visual/Q8/Q8A4.svg";
import Q8A5 from "../iqtestv2/Visual/Q8/Q8A5.svg";
import Q8A6 from "../iqtestv2/Visual/Q8/Q8A6.svg";

import Q9 from "../iqtestv2/Visual/Q9/Q9.svg";
import Q9A1 from "../iqtestv2/Visual/Q9/Q9A1.svg";
import Q9A2 from "../iqtestv2/Visual/Q9/Q9A2.svg";
import Q9A3 from "../iqtestv2/Visual/Q9/Q9A3.svg";
import Q9A4 from "../iqtestv2/Visual/Q9/Q9A4.svg";
import Q9A5 from "../iqtestv2/Visual/Q9/Q9A5.svg";
import Q9A6 from "../iqtestv2/Visual/Q9/Q9A6.svg";

import Q10 from "../iqtestv2/Visual/Q10/Q10.svg";
import Q10A1 from "../iqtestv2/Visual/Q10/Q10A1.svg";
import Q10A2 from "../iqtestv2/Visual/Q10/Q10A2.svg";
import Q10A3 from "../iqtestv2/Visual/Q10/Q10A3.svg";
import Q10A4 from "../iqtestv2/Visual/Q10/Q10A4.svg";
import Q10A5 from "../iqtestv2/Visual/Q10/Q10A5.svg";
import Q10A6 from "../iqtestv2/Visual/Q10/Q10A6.svg";

import Q11 from "../iqtestv2/Visual/Q11/Q11.svg";
import Q11A1 from "../iqtestv2/Visual/Q11/Q11A1.svg";
import Q11A2 from "../iqtestv2/Visual/Q11/Q11A2.svg";
import Q11A3 from "../iqtestv2/Visual/Q11/Q11A3.svg";
import Q11A4 from "../iqtestv2/Visual/Q11/Q11A4.svg";
import Q11A5 from "../iqtestv2/Visual/Q11/Q11A5.svg";
import Q11A6 from "../iqtestv2/Visual/Q11/Q11A6.svg";

import Q12 from "../iqtestv2/Visual/Q12/Q12.svg";
import Q12A1 from "../iqtestv2/Visual/Q12/Q12A1.svg";
import Q12A2 from "../iqtestv2/Visual/Q12/Q12A2.svg";
import Q12A3 from "../iqtestv2/Visual/Q12/Q12A3.svg";
import Q12A4 from "../iqtestv2/Visual/Q12/Q12A4.svg";
import Q12A5 from "../iqtestv2/Visual/Q12/Q12A5.svg";
import Q12A6 from "../iqtestv2/Visual/Q12/Q12A6.svg";

import Q13 from "../iqtestv2/Visual/Q13/Q13.svg";
import Q13A1 from "../iqtestv2/Visual/Q13/Q13A1.svg";
import Q13A2 from "../iqtestv2/Visual/Q13/Q13A2.svg";
import Q13A3 from "../iqtestv2/Visual/Q13/Q13A3.svg";
import Q13A4 from "../iqtestv2/Visual/Q13/Q13A4.svg";
import Q13A5 from "../iqtestv2/Visual/Q13/Q13A5.svg";
import Q13A6 from "../iqtestv2/Visual/Q13/Q13A6.svg";

import Q14 from "../iqtestv2/Visual/Q14/Q14.svg";
import Q14A1 from "../iqtestv2/Visual/Q14/Q14A1.svg";
import Q14A2 from "../iqtestv2/Visual/Q14/Q14A2.svg";
import Q14A3 from "../iqtestv2/Visual/Q14/Q14A3.svg";
import Q14A4 from "../iqtestv2/Visual/Q14/Q14A4.svg";
import Q14A5 from "../iqtestv2/Visual/Q14/Q14A5.svg";
import Q14A6 from "../iqtestv2/Visual/Q14/Q14A6.svg";

import Q15 from "../iqtestv2/Visual/Q15/Q15.svg";
import Q15A1 from "../iqtestv2/Visual/Q15/Q15A1.svg";
import Q15A2 from "../iqtestv2/Visual/Q15/Q15A2.svg";
import Q15A3 from "../iqtestv2/Visual/Q15/Q15A3.svg";
import Q15A4 from "../iqtestv2/Visual/Q15/Q15A4.svg";
import Q15A5 from "../iqtestv2/Visual/Q15/Q15A5.svg";
import Q15A6 from "../iqtestv2/Visual/Q15/Q15A6.svg";

import Q16 from "../iqtestv2/Visual/Q16/Q16.svg";
import Q16A1 from "../iqtestv2/Visual/Q16/Q16A1.svg";
import Q16A2 from "../iqtestv2/Visual/Q16/Q16A2.svg";
import Q16A3 from "../iqtestv2/Visual/Q16/Q16A3.svg";
import Q16A4 from "../iqtestv2/Visual/Q16/Q16A4.svg";
import Q16A5 from "../iqtestv2/Visual/Q16/Q16A5.svg";
import Q16A6 from "../iqtestv2/Visual/Q16/Q16A6.svg";

import Q17 from "../iqtestv2/Visual/Q17/Q17.svg";
import Q17A1 from "../iqtestv2/Visual/Q17/Q17A1.svg";
import Q17A2 from "../iqtestv2/Visual/Q17/Q17A2.svg";
import Q17A3 from "../iqtestv2/Visual/Q17/Q17A3.svg";
import Q17A4 from "../iqtestv2/Visual/Q17/Q17A4.svg";
import Q17A5 from "../iqtestv2/Visual/Q17/Q17A5.svg";
import Q17A6 from "../iqtestv2/Visual/Q17/Q17A6.svg";

import Q18 from "../iqtestv2/Visual/Q18/Q18.svg";
import Q18A1 from "../iqtestv2/Visual/Q18/Q18A1.svg";
import Q18A2 from "../iqtestv2/Visual/Q18/Q18A2.svg";
import Q18A3 from "../iqtestv2/Visual/Q18/Q18A3.svg";
import Q18A4 from "../iqtestv2/Visual/Q18/Q18A4.svg";
import Q18A5 from "../iqtestv2/Visual/Q18/Q18A5.svg";
import Q18A6 from "../iqtestv2/Visual/Q18/Q18A6.svg";

import Q19 from "../iqtestv2/Visual/Q19/Q19.svg";
import Q19A1 from "../iqtestv2/Visual/Q19/Q19A1.svg";
import Q19A2 from "../iqtestv2/Visual/Q19/Q19A2.svg";
import Q19A3 from "../iqtestv2/Visual/Q19/Q19A3.svg";
import Q19A4 from "../iqtestv2/Visual/Q19/Q19A4.svg";
import Q19A5 from "../iqtestv2/Visual/Q19/Q19A5.svg";
import Q19A6 from "../iqtestv2/Visual/Q19/Q19A6.svg";

import Q20 from "../iqtestv2/Visual/Q20/Q20.svg";
import Q20A1 from "../iqtestv2/Visual/Q20/Q20A1.svg";
import Q20A2 from "../iqtestv2/Visual/Q20/Q20A2.svg";
import Q20A3 from "../iqtestv2/Visual/Q20/Q20A3.svg";
import Q20A4 from "../iqtestv2/Visual/Q20/Q20A4.svg";
import Q20A5 from "../iqtestv2/Visual/Q20/Q20A5.svg";
import Q20A6 from "../iqtestv2/Visual/Q20/Q20A6.svg";

// Correct answers mapping (SVG filenames)
const CORRECT_ANSWERS: { [key: number]: string } = {
  1: "Q1A2.svg",
  2: "Q2A3.svg",
  3: "Q3A4.svg",
  4: "Q4A1.svg",
  5: "Q5A4.svg",
  6: "Q6A6.svg",
  7: "Q7A3.svg",
  8: "Q8A2.svg",
  9: "Q9A3.svg",
  10: "Q10A5.svg",
  11: "Q11A6.svg",
  12: "Q12A3.svg",
  13: "Q13A5.svg",
  14: "Q14A1.svg",
  15: "Q15A6.svg",
  16: "Q16A1.svg",
  17: "Q17A5.svg",
  18: "Q18A1.svg",
  19: "Q19A3.svg",
  20: "Q20A6.svg"
};

function IQTestPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1); // Current question number
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [answers, setAnswers] = useState<{ [key: number]: string }>({}); // Track all answers
  const isMobile = useMobile();
  
  // 3D card refs
  const cardRef = useRef<HTMLDivElement>(null);
  const cardShineRef = useRef<HTMLDivElement>(null);

  // Dynamic question and answer mapping
  const getQuestionImage = (questionNum: number) => {
    const questionMap: { [key: number]: string } = {
      1: Q1, 2: Q2, 3: Q3, 4: Q4, 5: Q5, 6: Q6, 7: Q7, 8: Q8, 9: Q9,
      10: Q10, 11: Q11, 12: Q12, 13: Q13, 14: Q14, 15: Q15, 16: Q16,
      17: Q17, 18: Q18, 19: Q19, 20: Q20
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
      20: [Q20A1, Q20A2, Q20A3, Q20A4, Q20A5, Q20A6],
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

  // 3D card mouse movement effect - only when hovering over card
  useEffect(() => {
    const wrapRef = cardRef.current?.parentElement;
    if (!wrapRef) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = wrapRef.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const currentMousePos = { x: event.clientX, y: event.clientY };
      const mouseFromCenter = {
        x: currentMousePos.x - cardCenterX,
        y: currentMousePos.y - cardCenterY
      };

      // Reduced rotation and translation to prevent clipping
      // Limit rotation to prevent clipping
      const maxRotation = 10; // Maximum rotation in degrees
      const maxTranslation = 15; // Maximum translation in pixels
      const around1 = -1 * Math.min(Math.max(mouseFromCenter.y / rect.height * maxRotation, -maxRotation), maxRotation) + 'deg';
      const around2 = Math.min(Math.max(mouseFromCenter.x / rect.width * maxRotation, -maxRotation), maxRotation) + 'deg';
      const trans1 = Math.min(Math.max(mouseFromCenter.x * 0.15, -maxTranslation), maxTranslation) + 'px';
      const trans2 = Math.min(Math.max(mouseFromCenter.y * 0.15, -maxTranslation), maxTranslation) + 'px';
      
      const dy = currentMousePos.y - cardCenterY;
      const dx = currentMousePos.x - cardCenterX;
      const theta = Math.atan2(dy, dx);
      const angle = theta * 180 / Math.PI - 90;

      // Update card shine gradient
      if (cardShineRef.current) {
        cardShineRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${Math.abs(mouseFromCenter.y / rect.height) * 0.7}) 0%,rgba(255,255,255, 0) 80%)`;
      }

      // Update card position and rotation
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${trans1}, ${trans2}, 0) rotatex(${around1}) rotatey(${around2})`;
      }
    };

    const handleMouseLeave = () => {
      // Reset card to original position when mouse leaves
      if (cardRef.current) {
        cardRef.current.style.transform = 'translate3d(0, 0, 0) rotatex(0deg) rotatey(0deg)';
      }
      if (cardShineRef.current) {
        cardShineRef.current.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%,rgba(255,255,255, 0) 60%)';
      }
    };

    wrapRef.addEventListener('mousemove', handleMouseMove);
    wrapRef.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      wrapRef.removeEventListener('mousemove', handleMouseMove);
      wrapRef.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate IQ score based on answers
  // Scoring System:
  // - Base IQ = 85
  // - Correct answer = +3 points
  // - Wrong answer = -1 point
  // Formula: finalIQ = 85 + (correctCount * 3) - (wrongCount * 1)
  // Clamp: min 65, max 145
  const calculateIQScore = (answers: { [key: number]: string }): number => {
    let correctCount = 0;
    let wrongCount = 0;
    
    // Check each answered question
    for (let q = 1; q <= 20; q++) {
      const userAnswer = answers[q];
      const correctAnswer = CORRECT_ANSWERS[q];
      
      if (userAnswer) {
        if (userAnswer === correctAnswer) {
          correctCount += 1;
        } else {
          wrongCount += 1;
        }
      }
    }
    
    // Calculate final IQ using the formula
    let finalIQ = 85 + (correctCount * 3) - (wrongCount * 1);
    
    // Apply clamping
    if (finalIQ > 145) {
      finalIQ = 145;
    }
    if (finalIQ < 65) {
      finalIQ = 65;
    }
    
    return finalIQ;
  };

  const handleAnswerSelect = (answerKey: string) => {
    // Set selected answer for visual feedback
    setSelectedAnswer(answerKey);
    
    // Map answer key (A-F) to SVG file name (Q1A1.svg, Q1A2.svg, etc.)
    // answerKey is 'A', 'B', 'C', 'D', 'E', or 'F'
    const keyToIndex: { [key: string]: number } = {
      'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5
    };
    
    const answerIndex = keyToIndex[answerKey];
    const selectedAnswerFile = `Q${currentQuestion}A${answerIndex + 1}.svg`;
    
    // Update answers state
    const updatedAnswers = {
      ...answers,
      [currentQuestion]: selectedAnswerFile
    };
    setAnswers(updatedAnswers);
    
    // Check if this is the last question (20)
    if (currentQuestion === 20) {
      // Calculate final score
      const finalIQ = calculateIQScore(updatedAnswers);
      
      // Store score in sessionStorage temporarily
      sessionStorage.setItem('iqtest_score', finalIQ.toString());
      
      // Navigate to analyzing page
      setTimeout(() => {
        navigate('/test/iqtest/analyzing');
      }, 300); // 300ms delay to show selection feedback
    } else {
      // Automatically move to next question after a brief delay for visual feedback
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null); // Reset selection for next question
      }, 300); // 300ms delay to show selection feedback
    }
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
      overflow: 'visible',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        overflow: 'visible',
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
              Question {currentQuestion} / 20
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
            alignItems: isMobile ? 'flex-start' : 'flex-start',
            justifyContent: 'center',
            minHeight: isMobile ? 'auto' : '500px',
            maxWidth: '1100px',
            margin: '0 auto',
            overflow: 'visible',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Question Image - Left Side, 3D Card */}
          <div style={{
            flex: '1',
            maxWidth: isMobile ? '100%' : '1000px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'relative',
            height: isMobile ? 'auto' : 'auto',
            width: isMobile ? '100%' : 'auto',
            overflow: 'visible',
            padding: isMobile ? '10px 30px' : '10px 150px',
            paddingTop: isMobile ? '10px' : '0px',
            boxSizing: 'border-box',
            margin: '0 auto',
            isolation: 'isolate',
            contain: 'none',
            clipPath: 'none',
          }}>
            <div className="iq-test-3d-wrap" style={{
              width: isMobile ? '100%' : '500px',
              height: isMobile ? '400px' : '500px',
              minHeight: isMobile ? '400px' : '500px',
              overflow: 'visible',
              position: 'relative',
              transform: 'translateZ(0)',
              contain: 'none',
              clipPath: 'none',
            }}>
              {/* Card */}
              <div ref={cardRef} className="iq-test-card">
                {/* Card Front */}
                <div className="iq-test-card-front">
                  <img
                    src={currentQuestionImage}
                    alt={`Question ${currentQuestion}`}
                    className="iq-test-question-image"
                  />
                </div>
                
                {/* Card Shine */}
                <div ref={cardShineRef} className="iq-test-card-shine" />
              </div>
            </div>
          </div>

          {/* Answer Options - Right Side, 2x3 Grid (Desktop) / 3x2 Grid (Mobile) */}
          <div style={{
            flex: '1',
            maxWidth: '500px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '12px' : '17px',
            alignItems: 'center',
            marginTop: isMobile ? '10px' : '30px',
          }}>
            {isMobile ? (
              // Mobile: 3 columns x 2 rows
              [
                [
                  { key: 'A', svg: currentAnswerImages[0] },
                  { key: 'B', svg: currentAnswerImages[1] },
                  { key: 'C', svg: currentAnswerImages[2] },
                ],
                [
                  { key: 'D', svg: currentAnswerImages[3] },
                  { key: 'E', svg: currentAnswerImages[4] },
                  { key: 'F', svg: currentAnswerImages[5] },
                ],
              ].map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: 'flex',
                    gap: '12px',
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
                        maxWidth: '110px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '8px',
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
              ))
            ) : (
              // Desktop: 2 columns x 3 rows (original layout)
              [
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
                    gap: '20px',
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
                        maxWidth: '145px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '10px',
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
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default IQTestPage;

