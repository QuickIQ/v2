import { useEffect, useState } from 'react';
import UniversalLandingPage from '../components/TestFlow/UniversalLandingPage';
import UniversalAnalyzingPage from '../components/TestFlow/UniversalAnalyzingPage';
import { getTestConfig } from '../utils/testContentLoader';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalityEmailPage from '../tests/personality/PersonalityEmailPage';
import testPageConfig from '../utils/testPageConfig.json';

// Dynamic imports helper
async function dynamicImport(path: string) {
  try {
    const module = await import(/* @vite-ignore */ path);
    return module.default || module;
  } catch (error) {
    console.error(`Failed to import ${path}:`, error);
    throw error;
  }
}

interface UniversalTestPageProps {
  testId: string;
}

function UniversalTestPage({ testId }: UniversalTestPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'questions'>('intro');
  
  // Dynamic imports state
  const [store, setStore] = useState<any>(null);
  const [QuestionsPage, setQuestionsPage] = useState<any>(null);
  const [resultContent, setResultContent] = useState<any>(null);
  const [questionsData, setQuestionsData] = useState<any>(null);
  
  // Get test config
  const testConfig = getTestConfig(testId);
  const pageConfig = (testPageConfig as any).tests[testId];
  
  if (!pageConfig) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      }}>
        <div className="error">Test configuration not found for: {testId}</div>
      </div>
    );
  }

  // Load dynamic imports
  useEffect(() => {
    async function loadImports() {
      try {
        const [storeModule, questionsPageModule, resultContentModule, questionsDataModule] = await Promise.all([
          dynamicImport(pageConfig.storePath),
          dynamicImport(pageConfig.questionsPagePath),
          dynamicImport(pageConfig.resultContentPath),
          dynamicImport(pageConfig.questionsDataPath),
        ]);
        
        // Get store hook (e.g., useAutismTestStore)
        const storeHookName = `use${pageConfig.storeName.charAt(0).toUpperCase() + pageConfig.storeName.slice(1)}`;
        const storeHook = storeModule[storeHookName] || storeModule.default;
        
        setStore(storeHook);
        setQuestionsPage(questionsPageModule);
        setResultContent(resultContentModule.resultContent || resultContentModule);
        setQuestionsData(questionsDataModule.default || questionsDataModule);
      } catch (err: any) {
        console.error('Error loading test modules:', err);
        setError(`Failed to load test modules: ${err.message}`);
      }
    }
    
    loadImports();
  }, [testId, pageConfig]);

  // Use store hook once loaded
  const storeState = store ? store() : null;
  
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
  } = storeState || {};

  // Initialize component - only run once on mount
  useEffect(() => {
    if (!store) return;
    
    // Check if we're coming from unlock page with results step
    if (location.state && (location.state as any).step === 'results') {
      setStep('results');
      setIsInitialized(true);
      return;
    }
    
    const storeInstance = store.getState();
    const storeStep = storeInstance.step;
    
    // Only reset to landing if we're actually starting fresh
    if (!storeStep || storeStep === 'landing') {
      storeInstance.setCurrentQuestionIndex(0);
      setStep('landing');
      setPhase('intro');
    } else {
      setStep(storeStep);
    }
    
    try {
      const storeQuestions = storeInstance.questions;
      
      if (storeQuestions.length === 0 && questionsData && questionsData.length > 0) {
        setQuestions(questionsData);
      }
    } catch (err: any) {
      console.error('Error loading questions:', err);
      setError(err.message || 'Failed to load questions');
    }
    
    setIsInitialized(true);
  }, [store, questionsData]);

  // Handle location state changes
  useEffect(() => {
    if (location.state && (location.state as any).step === 'results') {
      setStep('results');
    }
  }, [location.state, setStep]);

  useEffect(() => {
    if (!store) return;
    
    console.log('🔄 Step changed to:', step);
    
    if (step === 'questions') {
      const storeInstance = store.getState();
      const storeQuestions = storeInstance.questions;
      
      if (storeQuestions.length === 0) {
        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData);
        } else {
          setError('Questions data not available');
        }
      }
      
      if (storeInstance.currentQuestionIndex >= storeQuestions.length || storeInstance.currentQuestionIndex < 0) {
        storeInstance.setCurrentQuestionIndex(0);
      }
      
      if (!storeInstance.timeRemaining || storeInstance.timeRemaining <= 0 || storeInstance.timeRemaining > 10 * 60 || isNaN(storeInstance.timeRemaining)) {
        setTimeRemaining(10 * 60);
      }
    }
  }, [step, store, questionsData, setQuestions, setTimeRemaining]);

  const handleStart = () => {
    if (!store) return;
    
    const storeInstance = store.getState();
    const storeQuestions = storeInstance.questions;
    
    if (storeQuestions.length === 0) {
      if (questionsData && questionsData.length > 0) {
        setQuestions(questionsData);
      } else {
        setError('Questions data not available');
        return;
      }
    }

    storeInstance.setCurrentQuestionIndex(0);
    
    const timerSeconds = 10 * 60; // 10 minutes
    storeInstance.setTimeRemaining(timerSeconds);
    
    store.setState({ answers: [] });
    store.setState({ totalScore: 0 });
    store.setState({ resultLevel: null });
    
    setStep('questions');
    setPhase('questions');
  };

  const handleQuestionsComplete = async () => {
    console.log('🎯 handleQuestionsComplete called');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      setError(null);
      
      console.log('📊 Calculating score...');
      calculateScore();
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      console.log('➡️ Transitioning to analyzing screen...');
      setStep('analyzing');
      
      const storeAfterSet = store.getState();
      console.log('✅ Step set to:', storeAfterSet.step);
      console.log('✅ Current step in component:', step);
    } catch (err) {
      console.error('❌ Error in handleQuestionsComplete:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStep('analyzing');
    }
  };

  const handleAnalyzingComplete = async () => {
    try {
      console.log('📧 handleAnalyzingComplete called');
      
      let storeInstance = store.getState();
      if (!storeInstance.resultLevel) {
        console.log('⚠️ No resultLevel found, calculating score...');
        calculateScore();
        await new Promise(resolve => setTimeout(resolve, 200));
        storeInstance = store.getState();
      }
      
      const level = storeInstance.resultLevel || 'good';
      console.log('📊 Result level:', level);
      
      const result = resultContent[level];
      setResultData(result);
      console.log('✅ Result data set for level:', level);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('➡️ Transitioning to email screen...');
      const storeAfterSet = store.getState();
      storeAfterSet.setStep('email');
      setStep('email');
      
      await new Promise(resolve => setTimeout(resolve, 50));
      const finalStore = store.getState();
      console.log('✅ Step set to:', finalStore.step);
      console.log('✅ Component step:', step);
    } catch (err: any) {
      console.error('❌ Error in handleAnalyzingComplete:', err);
      const result = resultContent['good'];
      setResultData(result);
      const storeInstance = store.getState();
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
    
    const storeInstance = store.getState();
    if (!storeInstance.sessionToken) {
      const tempToken = `temp_${Date.now()}`;
      storeInstance.setSessionToken(tempToken);
    }
    
    navigate(`/test/${testId}/payment`);
  };

  useEffect(() => {
    if (!store) return;
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const storeInstance = store.getState();
      if (storeInstance.step === 'questions' && storeInstance.answers.length > 0) {
        e.preventDefault();
        e.returnValue = t(`tests.${testId}.warnings.leave_page`) || 'If you leave this page, your current test progress will be lost. Continue?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [t, testId, store]);

  if (!store || !QuestionsPage || !resultContent || !questionsData) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#10b981' }}>
          {t('common.loading') || 'Loading test...'}
        </div>
      </div>
    );
  }

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
              setQuestions(questionsData);
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
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#10b981' }}>
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
          <UniversalLandingPage 
            testId={testId} 
            onStart={handleStart}
            iconName={testConfig?.icon}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  switch (step) {
    case 'questions':
      const currentQuestionsFromStore = store.getState().questions;
      const questionsToUse = currentQuestionsFromStore.length > 0 ? currentQuestionsFromStore : questions;
      
      if (questionsToUse.length === 0) {
        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData);
        }
        return (
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
          }}>
            <div className="loading" style={{ fontSize: '18px', color: '#10b981' }}>
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
            <QuestionsPage
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
            <UniversalAnalyzingPage 
              testId={testId} 
              onComplete={handleAnalyzingComplete} 
            />
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
      console.warn('⚠️ Unknown step:', step);
      if (!step) {
        setStep('landing');
        return (
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
          }}>
            <div className="loading" style={{ fontSize: '18px', color: '#10b981' }}>
              {t('common.loading')}
            </div>
          </div>
        );
      }
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key="analyzing-fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <UniversalAnalyzingPage 
              testId={testId} 
              onComplete={handleAnalyzingComplete} 
            />
          </motion.div>
        </AnimatePresence>
      );
  }
}

export default UniversalTestPage;

