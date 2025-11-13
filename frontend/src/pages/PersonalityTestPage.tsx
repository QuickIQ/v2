import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonalityTestStore } from '../store/personalityTestStore';
import PersonalityIntro from '../tests/personality/PersonalityIntro';
import PersonalityQuestionsPage from '../tests/personality/PersonalityQuestionsPage';
import PersonalityResultPage from '../tests/personality/PersonalityResultPage';
import PersonalityAnalyzingPage from '../tests/personality/PersonalityAnalyzingPage';
import PersonalityEmailPage from '../tests/personality/PersonalityEmailPage';
import questionsData from '../data/tests/personality/questions.json';

function PersonalityTestPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    step,
    questions,
    answers,
    personalityType,
    resultData,
    setStep,
    setQuestions,
    setTimeRemaining,
    calculatePersonalityType,
    setResultData,
    setEmail,
  } = usePersonalityTestStore();

  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'questions'>('intro');
  
  // Debug: Log component render
  console.log('🔵 PersonalityTestPage render - step:', step, 'phase:', phase, 'questions.length:', questions.length);

  // Initialize: Always reset to fresh start and load questions
  useEffect(() => {
    console.log('🟢 useEffect[onMount] - Initializing...');
    
    const store = usePersonalityTestStore.getState();
    console.log('📊 Current step from store:', store.step);
    
    // Always reset to fresh start when page loads
    console.log('🔄 Resetting to fresh start...');
    store.setCurrentQuestionIndex(0);
    store.updateScores({
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    });
    usePersonalityTestStore.setState({ answers: [] });
    setStep('landing');
    setPhase('intro');
    
    // Load questions
    try {
      const storeQuestions = usePersonalityTestStore.getState().questions;
      console.log('📊 Store questions length:', storeQuestions.length);
      console.log('📊 Questions data length:', questionsData.length);
      
      if (storeQuestions.length === 0 && questionsData && questionsData.length > 0) {
        console.log('✅ Setting questions to store...');
        setQuestions(questionsData as any);
        console.log('✅ Questions set. New store length:', usePersonalityTestStore.getState().questions.length);
      } else {
        console.log('ℹ️ Questions already in store or questionsData is empty');
      }
    } catch (err: any) {
      console.error('❌ Error loading questions:', err);
      setError(err.message || 'Failed to load questions');
    }
    
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Ensure questions are loaded when entering questions step
  useEffect(() => {
    if (step === 'questions') {
      console.log('🟡 useEffect[step=questions] - Checking questions...');
      const store = usePersonalityTestStore.getState();
      const storeQuestions = store.questions;
      console.log('📊 Questions in store:', storeQuestions.length);
      console.log('📊 Current question index:', store.currentQuestionIndex);
      console.log('📊 Time remaining:', store.timeRemaining);
      
      if (storeQuestions.length === 0) {
        console.log('⚠️ No questions in store, loading now...');
        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData as any);
          console.log('✅ Questions loaded. New length:', usePersonalityTestStore.getState().questions.length);
        } else {
          console.error('❌ questionsData is empty or undefined!');
          setError('Questions data not available');
        }
      } else {
        console.log('✅ Questions already loaded');
      }
      
      // Reset question index if it's out of bounds
      if (store.currentQuestionIndex >= storeQuestions.length || store.currentQuestionIndex < 0) {
        console.log('🔄 Resetting question index to 0');
        store.setCurrentQuestionIndex(0);
      }
      
      // Ensure timer is set correctly (should already be set by handleStart, but double-check)
      if (!store.timeRemaining || store.timeRemaining <= 0 || store.timeRemaining > 15 * 60 || isNaN(store.timeRemaining)) {
        console.log('🕐 Timer invalid, resetting to 15 minutes');
        setTimeRemaining(15 * 60);
      } else {
        console.log('✅ Timer is valid:', store.timeRemaining, 'seconds');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]); // Only depend on step

  const handleStart = () => {
    console.log('🚀 Start button clicked!');
    console.log('📊 Current phase:', phase);
    console.log('📊 Questions length (from hook):', questions.length);
    
    // Always ensure questions are loaded before proceeding
    const storeQuestions = usePersonalityTestStore.getState().questions;
    console.log('📊 Questions length (from store):', storeQuestions.length);
    
    if (storeQuestions.length === 0) {
      console.log('⚠️ No questions in store, loading them now...');
      if (questionsData && questionsData.length > 0) {
        setQuestions(questionsData as any);
        console.log('✅ Questions set. Verifying...', usePersonalityTestStore.getState().questions.length);
      } else {
        console.error('❌ questionsData is empty!');
        setError('Questions data not available');
        return;
      }
    }
    
    // Reset test state for fresh start
    const store = usePersonalityTestStore.getState();
    store.setCurrentQuestionIndex(0); // Start from question 1 (index 0)
    
    // Reset timer to 15 minutes and start it immediately
    const timerSeconds = 15 * 60; // 15 minutes in seconds
    store.setTimeRemaining(timerSeconds);
    console.log('🕐 Timer started with:', timerSeconds, 'seconds (15:00)');
    
    // Reset answers and scores for fresh test
    store.updateScores({
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    });
    // Clear previous answers
    usePersonalityTestStore.setState({ answers: [] });
    
    // Set step to questions in store and change phase
    console.log('➡️ Setting step to questions and phase to questions...');
    setStep('questions');
    setPhase('questions');
    console.log('✅ Step and phase set. New step:', usePersonalityTestStore.getState().step);
    console.log('✅ Question index reset to:', usePersonalityTestStore.getState().currentQuestionIndex);
    console.log('✅ Timer started at:', usePersonalityTestStore.getState().timeRemaining, 'seconds');
  };

  const handleQuestionsComplete = async () => {
    // Small delay to ensure store has been updated after the last answer
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Get the latest values directly from the store to avoid stale closure issues
    const store = usePersonalityTestStore.getState();
    const currentAnswers = store.answers;
    const currentQuestions = store.questions;
    
    console.log('🔍 Validating answers:', {
      answersCount: currentAnswers.length,
      questionsCount: currentQuestions.length,
      answers: currentAnswers.map(a => ({ q: a.question_id, opt: a.option_index }))
    });
    
    // Check if we have answers for all questions
    if (currentAnswers.length < currentQuestions.length) {
      console.warn('⚠️ Not all questions answered:', {
        answered: currentAnswers.length,
        total: currentQuestions.length
      });
      setError('Please answer all questions');
      return;
    }
    
    // Additional check: ensure each question has an answer
    const answeredQuestionIds = new Set(currentAnswers.map(a => a.question_id));
    const allQuestionIds = new Set(currentQuestions.map(q => q.id));
    
    if (answeredQuestionIds.size !== allQuestionIds.size) {
      console.warn('⚠️ Some questions are missing answers:', {
        answeredIds: Array.from(answeredQuestionIds),
        allIds: Array.from(allQuestionIds),
        missingIds: Array.from(allQuestionIds).filter(id => !answeredQuestionIds.has(id))
      });
      setError('Please answer all questions');
      return;
    }

    console.log('✅ All questions answered, proceeding to analyzing...');
    setError(null); // Clear any previous errors
    calculatePersonalityType();
    setStep('analyzing');
  };

  const handleAnalyzingComplete = async () => {
    try {
      // Load result data
      const type = usePersonalityTestStore.getState().personalityType;
      if (type) {
        try {
          const resultModule = await import(`../data/results/personality/${type}.json`);
          setResultData(resultModule.default);
          setStep('email');
        } catch (importErr: any) {
          console.error('Error importing result file:', importErr);
          // Fallback: create a basic result structure
          setResultData({
            title: `${type} — Your Personality Type`,
            subtitle: 'Discover your unique traits',
            core_characteristics: ['Characteristic 1', 'Characteristic 2', 'Characteristic 3'],
            strengths: ['Strength 1', 'Strength 2', 'Strength 3'],
            challenges: ['Challenge 1', 'Challenge 2', 'Challenge 3'],
            ideal_careers: { primary: ['Career 1', 'Career 2'] },
            future_roles: ['Role 1', 'Role 2'],
            famous_examples: ['Example 1', 'Example 2'],
            closing_quote: `Your ${type} personality brings unique strengths to the world.`,
          });
          setStep('email');
        }
      } else {
        setError(t('tests.personality.errors.load_result'));
        setStep('questions');
      }
    } catch (err: any) {
      console.error('Error loading result:', err);
      setError(err.message || t('tests.personality.errors.load_result'));
      setStep('questions');
    }
  };

  const handleEmailSubmit = async (emailValue: string, acceptedTerms: boolean, acceptedPrivacy: boolean) => {
    if (!acceptedTerms || !acceptedPrivacy) {
      setError('Please accept both Terms and Conditions and Privacy Policy');
      return;
    }
    
    setEmail(emailValue);
    
    // Ensure we have a valid session token
    const store = usePersonalityTestStore.getState();
    if (!store.sessionToken) {
      // Generate a temporary session token if none exists
      const tempToken = `temp_${Date.now()}`;
      store.setSessionToken(tempToken);
    }
    
    // Navigate to payment page instead of changing step
    navigate('/test/personality/payment');
  };



  // Add beforeunload warning when user is in test
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const store = usePersonalityTestStore.getState();
      // Only show warning if user is actively taking the test
      if (store.step === 'questions' && store.answers.length > 0) {
        e.preventDefault();
        e.returnValue = t('tests.personality.warnings.leave_page') || 'If you leave this page, your current test progress will be lost. Continue?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [t]);


  // Show error if questions failed to load (only if not on landing page)
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

  // Wait for initialization before rendering
  if (!isInitialized) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #E1F5FE 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#ec4899' }}>
          {t('common.loading')}
        </div>
      </div>
    );
  }

  // Handle phase-based rendering (intro/questions on same page)
  // Render intro/questions with smooth fade transition
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
          <PersonalityIntro onStart={handleStart} />
        </motion.div>
      </AnimatePresence>
    );
  }

  switch (step) {
    case 'questions':
      // Check both hook value and store value for questions
      const currentQuestionsFromStore = usePersonalityTestStore.getState().questions;
      const questionsToUse = currentQuestionsFromStore.length > 0 ? currentQuestionsFromStore : questions;
      
      console.log('📋 Questions step render:');
      console.log('  - Hook questions.length:', questions.length);
      console.log('  - Store questions.length:', currentQuestionsFromStore.length);
      console.log('  - Using questions.length:', questionsToUse.length);
      
      if (questionsToUse.length === 0) {
        console.log('⏳ Questions empty, showing loading...');
        // Force a re-render by setting questions if we have the data
        if (questionsData && questionsData.length > 0) {
          console.log('🔄 Force loading questions in render...');
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
            <div className="loading" style={{ fontSize: '18px', color: '#ec4899' }}>
              {t('common.loading')}
            </div>
          </div>
        );
      }
      
      console.log('✅ Rendering questions page with', questionsToUse.length, 'questions');
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PersonalityQuestionsPage
              questions={questionsToUse}
              onComplete={handleQuestionsComplete}
            />
          </motion.div>
        </AnimatePresence>
      );
    case 'analyzing':
      return <PersonalityAnalyzingPage onComplete={handleAnalyzingComplete} />;
    case 'email':
      return <PersonalityEmailPage onSubmit={handleEmailSubmit} />;
    case 'payment':
      // Payment is now handled by separate route /test/personality/payment
      // Redirect if somehow we're here
      navigate('/test/personality/payment');
      return null;
    case 'unlock':
      // Unlock is now handled by separate route /test/personality/unlock
      // Redirect if somehow we're here
      navigate('/test/personality/unlock');
      return null;
    case 'results':
      if (!personalityType || !resultData) {
        return <div className="loading">{t('common.loading')}</div>;
      }
      return (
        <PersonalityResultPage
          personalityType={personalityType}
          resultData={resultData}
        />
      );
    default:
      return null;
  }
}

export default PersonalityTestPage;

