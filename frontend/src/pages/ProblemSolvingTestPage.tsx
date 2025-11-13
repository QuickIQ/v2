import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useProblemSolvingTestStore } from '../store/problemSolvingTestStore';
import ProblemSolvingIntro from '../tests/iq/problemSolving/index';
import ProblemSolvingQuestionsPage from '../tests/iq/problemSolving/QuestionsPage';
import ProblemSolvingAnalyzingPage from '../tests/iq/problemSolving/ProblemSolvingAnalyzingPage';
import PersonalityEmailPage from '../tests/personality/PersonalityEmailPage';
import { resultContent } from '../tests/iq/problemSolving/resultContent';
import questionsData from '../data/tests/problemSolving/questions.json';

function ProblemSolvingTestPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    step,
    questions,
    answers,
    totalScore,
    resultLevel,
    resultData,
    setStep,
    setQuestions,
    setTimeRemaining,
    calculateScore,
    setResultData,
    setEmail,
  } = useProblemSolvingTestStore();

  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'questions'>('intro');

  // Initialize component - only run once on mount
  useEffect(() => {
    // Check if we're coming from unlock page with results step
    if (location.state && (location.state as any).step === 'results') {
      setStep('results');
      setIsInitialized(true);
      return;
    }
    
    const store = useProblemSolvingTestStore.getState();
    const storeStep = store.step;
    
    // Only reset to landing if we're actually starting fresh (no step set or landing)
    // Don't reset if we're in the middle of a test flow (questions, analyzing, email, etc.)
    if (!storeStep || storeStep === 'landing') {
      store.setCurrentQuestionIndex(0);
      setStep('landing');
      setPhase('intro');
    } else {
      // Preserve the current step from store
      setStep(storeStep);
    }
    
    try {
      const storeQuestions = useProblemSolvingTestStore.getState().questions;
      
      if (storeQuestions.length === 0 && questionsData && questionsData.length > 0) {
        setQuestions(questionsData as any);
      }
    } catch (err: any) {
      console.error('Error loading questions:', err);
      setError(err.message || 'Failed to load questions');
    }
    
    setIsInitialized(true);
  }, []); // Only run on mount

  // Handle location state changes (e.g., coming from unlock page)
  useEffect(() => {
    if (location.state && (location.state as any).step === 'results') {
      setStep('results');
    }
  }, [location.state]);

  useEffect(() => {
    console.log('🔄 Step changed to:', step);
    
    if (step === 'questions') {
      const store = useProblemSolvingTestStore.getState();
      const storeQuestions = store.questions;
      
      if (storeQuestions.length === 0) {
        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData as any);
        } else {
          setError('Questions data not available');
        }
      }
      
      if (store.currentQuestionIndex >= storeQuestions.length || store.currentQuestionIndex < 0) {
        store.setCurrentQuestionIndex(0);
      }
      
      if (!store.timeRemaining || store.timeRemaining <= 0 || store.timeRemaining > 10 * 60 || isNaN(store.timeRemaining)) {
        setTimeRemaining(10 * 60);
      }
    }
  }, [step]);

  const handleStart = () => {
    const storeQuestions = useProblemSolvingTestStore.getState().questions;
    
    if (storeQuestions.length === 0) {
      if (questionsData && questionsData.length > 0) {
        setQuestions(questionsData as any);
      } else {
        setError('Questions data not available');
        return;
      }
    }
    
    const store = useProblemSolvingTestStore.getState();
    store.setCurrentQuestionIndex(0);
    
    const timerSeconds = 10 * 60; // 10 minutes
    store.setTimeRemaining(timerSeconds);
    
    useProblemSolvingTestStore.setState({ answers: [] });
    useProblemSolvingTestStore.setState({ totalScore: 0 });
    useProblemSolvingTestStore.setState({ resultLevel: null });
    
    setStep('questions');
    setPhase('questions');
  };

  const handleQuestionsComplete = async () => {
    console.log('🎯 handleQuestionsComplete called');
    
    try {
      // Small delay to ensure store has been updated after the last answer
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // No validation - always proceed to analyzing
      setError(null);
      
      // Calculate score first
      console.log('📊 Calculating score...');
      calculateScore();
      
      // Small delay to ensure score is calculated before transitioning
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Transition to analyzing screen
      console.log('➡️ Transitioning to analyzing screen...');
      setStep('analyzing');
      
      // Verify step was set
      const storeAfterSet = useProblemSolvingTestStore.getState();
      console.log('✅ Step set to:', storeAfterSet.step);
      console.log('✅ Current step in component:', step);
    } catch (err) {
      console.error('❌ Error in handleQuestionsComplete:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Even on error, try to proceed to analyzing
      setStep('analyzing');
    }
  };

  const handleAnalyzingComplete = async () => {
    try {
      console.log('📧 handleAnalyzingComplete called');
      
      // Ensure score is calculated
      let store = useProblemSolvingTestStore.getState();
      if (!store.resultLevel) {
        console.log('⚠️ No resultLevel found, calculating score...');
        calculateScore();
        // Wait a bit for score calculation
        await new Promise(resolve => setTimeout(resolve, 200));
        store = useProblemSolvingTestStore.getState();
      }
      
      const level = store.resultLevel || 'good';
      console.log('📊 Result level:', level);
      
      // Set result data first
      const result = resultContent[level];
      setResultData(result);
      console.log('✅ Result data set for level:', level);
      
      // Wait a bit to ensure result data is set
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Transition to email screen - use store's setStep directly
      console.log('➡️ Transitioning to email screen...');
      const storeInstance = useProblemSolvingTestStore.getState();
      storeInstance.setStep('email');
      
      // Also call the component's setStep for immediate update
      setStep('email');
      
      // Verify step was set
      await new Promise(resolve => setTimeout(resolve, 50));
      const storeAfterSet = useProblemSolvingTestStore.getState();
      console.log('✅ Step set to:', storeAfterSet.step);
      console.log('✅ Component step:', step);
    } catch (err: any) {
      console.error('❌ Error in handleAnalyzingComplete:', err);
      // Even on error, proceed to email screen
      const result = resultContent['good'];
      setResultData(result);
      const storeInstance = useProblemSolvingTestStore.getState();
      storeInstance.setStep('email');
      setStep('email');
    }
  };

  const handleEmailSubmit = async (emailValue: string, acceptedTerms: boolean, acceptedPrivacy: boolean) => {
    if (!acceptedTerms || !acceptedPrivacy) {
      setError('Please accept both Terms and Conditions and Privacy Policy');
      return;
    }
    
    setEmail(emailValue);
    
    const store = useProblemSolvingTestStore.getState();
    if (!store.sessionToken) {
      const tempToken = `temp_${Date.now()}`;
      store.setSessionToken(tempToken);
    }
    
    // Navigate to payment page
    navigate('/test/problemSolving/payment');
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const store = useProblemSolvingTestStore.getState();
      if (store.step === 'questions' && store.answers.length > 0) {
        e.preventDefault();
        e.returnValue = t('tests.problemSolving.warnings.leave_page') || 'If you leave this page, your current test progress will be lost. Continue?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [t]);

  if (error && step !== 'landing') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #E1F5FE 100%)',
        padding: '40px',
      }}>
        <div className="card" style={{
          maxWidth: '600px',
          padding: '40px',
          textAlign: 'center',
        }}>
          <div className="error" style={{ marginBottom: '20px' }}>{error}</div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setError(null);
              setQuestions(questionsData as any);
            }}
          >
            {t('common.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #E1F5FE 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#2196F3' }}>
          {t('common.loading')}
        </div>
      </div>
    );
  }

  if (step === 'landing' || phase === 'intro') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProblemSolvingIntro onStart={handleStart} />
        </motion.div>
      </AnimatePresence>
    );
  }

  switch (step) {
    case 'questions':
      const currentQuestionsFromStore = useProblemSolvingTestStore.getState().questions;
      const questionsToUse = currentQuestionsFromStore.length > 0 ? currentQuestionsFromStore : questions;
      
      if (questionsToUse.length === 0) {
        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData as any);
        }
        return (
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #E3F2FD 0%, #E1F5FE 100%)',
          }}>
            <div className="loading" style={{ fontSize: '18px', color: '#2196F3' }}>
              {t('common.loading')}
            </div>
          </div>
        );
      }
      
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProblemSolvingQuestionsPage
              questions={questionsToUse}
              onComplete={handleQuestionsComplete}
            />
          </motion.div>
        </AnimatePresence>
      );
    case 'analyzing':
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProblemSolvingAnalyzingPage onComplete={handleAnalyzingComplete} />
          </motion.div>
        </AnimatePresence>
      );
    case 'email':
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key="email"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PersonalityEmailPage onSubmit={handleEmailSubmit} />
          </motion.div>
        </AnimatePresence>
      );
    case 'results':
      if (!resultLevel || !resultData) {
        return <div className="loading">{t('common.loading')}</div>;
      }
      // Result page will be created separately
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>Results Page - To be implemented</div>
          </motion.div>
        </AnimatePresence>
      );
    default:
      // Fallback: if step is not recognized, show loading or redirect to landing
      console.warn('⚠️ Unknown step:', step);
      // If step is undefined/null, go to landing
      if (!step) {
        setStep('landing');
        return (
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #E3F2FD 0%, #E1F5FE 100%)',
          }}>
            <div className="loading" style={{ fontSize: '18px', color: '#2196F3' }}>
              {t('common.loading')}
            </div>
          </div>
        );
      }
      // Otherwise, try to show analyzing screen as fallback
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key="analyzing-fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ProblemSolvingAnalyzingPage onComplete={handleAnalyzingComplete} />
          </motion.div>
        </AnimatePresence>
      );
  }
}

export default ProblemSolvingTestPage;
