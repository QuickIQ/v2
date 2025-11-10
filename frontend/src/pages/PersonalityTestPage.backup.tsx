import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonalityTestStore } from '../store/personalityTestStore';
import PersonalityIntro from '../tests/personality/PersonalityIntro';
import PersonalityQuestionsPage from '../tests/personality/PersonalityQuestionsPage';
import PersonalityResultPage from '../tests/personality/PersonalityResultPage';
import PersonalityAnalyzingPage from '../tests/personality/PersonalityAnalyzingPage';
import PersonalityEmailPage from '../tests/personality/PersonalityEmailPage';
import PaymentPage from '../components/TestFlow/PaymentPage';
import questionsData from '../data/tests/personality/questions.json';

function PersonalityTestPage() {
  const { t } = useTranslation();
  const {
    step,
    questions,
    answers,
    personalityType,
    resultData,
    sessionToken,
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
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [hasCheckedProgress, setHasCheckedProgress] = useState(false);
  
  // Debug: Log component render
  console.log('🔵 PersonalityTestPage render - step:', step, 'phase:', phase, 'questions.length:', questions.length);

  // Check for saved progress on mount
  useEffect(() => {
    // Wait a bit for Zustand to hydrate from localStorage
    const checkProgressTimeout = setTimeout(() => {
      const store = usePersonalityTestStore.getState();
      const savedAnswers = store.answers || [];
      const savedStep = store.step;
      const savedQuestionIndex = store.currentQuestionIndex || 0;
      
      console.log('🔍 Checking for saved progress:');
      console.log('  - Saved answers:', savedAnswers.length);
      console.log('  - Saved step:', savedStep);
      console.log('  - Saved question index:', savedQuestionIndex);
      
      // If we have saved progress and we're not on a completed step
      if (savedAnswers.length > 0 && savedStep !== 'results' && savedStep !== 'email' && savedStep !== 'payment') {
        console.log('✅ Found saved progress, showing resume modal');
        setShowResumeModal(true);
      } else {
        console.log('ℹ️ No saved progress found, starting fresh');
        // Reset to fresh start
        store.setCurrentQuestionIndex(0);
        store.updateScores({
          E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
        });
        usePersonalityTestStore.setState({ answers: [] });
        setStep('landing');
        setPhase('intro');
      }
      
      setHasCheckedProgress(true);
    }, 200); // Wait 200ms for hydration

    return () => clearTimeout(checkProgressTimeout);
  }, []);

  // Initialize: Load questions and set up
  useEffect(() => {
    if (!hasCheckedProgress) return; // Wait for progress check first
    
    console.log('🟢 useEffect[onMount] - Initializing...');
    
    const store = usePersonalityTestStore.getState();
    console.log('📊 Current step from store:', store.step);
    
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
  }, [hasCheckedProgress]); // Run after progress check

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
    if (answers.length < questions.length) {
      setError('Please answer all questions');
      return;
    }

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
    setStep('payment');
  };

  const handlePaymentSuccess = () => {
    setStep('results');
  };

  const handleResumeTest = () => {
    console.log('✅ User chose to resume test');
    const store = usePersonalityTestStore.getState();
    const savedStep = store.step;
    const savedQuestionIndex = store.currentQuestionIndex || 0;
    
    // If we were on questions, restore that state
    if (savedStep === 'questions' && savedQuestionIndex >= 0) {
      setPhase('questions');
      setStep('questions');
    } else {
      // Otherwise start from questions
      setPhase('questions');
      setStep('questions');
    }
    
    setShowResumeModal(false);
  };

  const handleStartOver = () => {
    console.log('🔄 User chose to start over');
    const store = usePersonalityTestStore.getState();
    
    // Clear all saved progress
    store.setCurrentQuestionIndex(0);
    store.updateScores({
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    });
    usePersonalityTestStore.setState({ answers: [] });
    setStep('landing');
    setPhase('intro');
    setShowResumeModal(false);
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
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
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
  if (!isInitialized || !hasCheckedProgress) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#ec4899' }}>
          {t('common.loading')}
        </div>
      </div>
    );
  }

  // Resume Modal
  if (showResumeModal) {
    const store = usePersonalityTestStore.getState();
    const savedAnswers = store.answers || [];
    const savedQuestionIndex = store.currentQuestionIndex || 0;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px',
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
          }}
        >
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('tests.personality.resume.title') || 'Continue Your Test?'}
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '32px',
            lineHeight: '1.6',
          }}>
            {t('tests.personality.resume.message', {
              answered: savedAnswers.length,
              current: savedQuestionIndex + 1,
              total: questions.length || 25
            }) || `You've answered ${savedAnswers.length} questions and are currently on question ${savedQuestionIndex + 1} of ${questions.length || 25}. Would you like to continue from where you left off or start over?`}
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
          }}>
            <motion.button
              onClick={handleResumeTest}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 143, 163, 0.3)',
              }}
            >
              {t('tests.personality.resume.continue', { current: savedQuestionIndex + 1 }) || `Continue from Question ${savedQuestionIndex + 1}`}
            </motion.button>
            <motion.button
              onClick={handleStartOver}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 28px',
                background: '#f0f0f0',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                color: '#666',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              {t('tests.personality.resume.restart') || 'Start Over'}
            </motion.button>
          </div>
        </motion.div>
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
            background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
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
      return (
        <PaymentPage
          test={{
            id: 0,
            name: 'Personality Type Test',
            slug: 'personality',
            category: 'Personality',
            enabled: true,
            default_language: 'en',
            is_premium: true,
            price_cents: 195, // $1.95
            test_type: 'personality',
            translated_name: 'Personality Type Test',
          }}
          sessionId={sessionToken ? parseInt(sessionToken) || 0 : 0}
          onSuccess={handlePaymentSuccess}
        />
      );
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



