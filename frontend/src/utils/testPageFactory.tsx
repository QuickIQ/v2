import { useEffect, useState } from 'react';
import UniversalLandingPage from '../components/TestFlow/UniversalLandingPage';
import UniversalAnalyzingPage from '../components/TestFlow/UniversalAnalyzingPage';
import { getTestConfig } from './testContentLoader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalityEmailPage from '../tests/personality/PersonalityEmailPage';

// Import all stores dynamically
import { useAutismTestStore } from '../store/autismTestStore';
import { useCriticismTestStore } from '../store/criticismTestStore';
import { useProblemSolvingTestStore } from '../store/problemSolvingTestStore';
import { useCreativeThinkingTestStore } from '../store/creativeThinkingTestStore';
import { useDepressionTestStore } from '../store/depressionTestStore';
import { useMultitaskingTestStore } from '../store/multitaskingTestStore';
import { useAttentionSpanTestStore } from '../store/attentionSpanTestStore';
import { useMemoryRetentionTestStore } from '../store/memoryRetentionTestStore';
import { useEntrepreneurMindsetTestStore } from '../store/entrepreneurMindsetTestStore';
import { useRiskToleranceTestStore } from '../store/riskToleranceTestStore';
import { useStrategicThinkingTestStore } from '../store/strategicThinkingTestStore';
import { useTimeManagementTestStore } from '../store/timeManagementTestStore';
import { useDecisionMakingTestStore } from '../store/decisionMakingTestStore';
import { useLeadershipArchetypeTestStore } from '../store/leadershipArchetypeTestStore';
import { useNegotiationSkillsTestStore } from '../store/negotiationSkillsTestStore';
import { useStressManagementTestStore } from '../store/stressManagementTestStore';
import { useTeamPlayerTestStore } from '../store/teamPlayerTestStore';
import { useSuccessTestStore } from '../store/successTestStore';
import { usePerfectionismTestStore } from '../store/perfectionismTestStore';
import { useAmbitionTestStore } from '../store/ambitionTestStore';
import { useAnxietyTestStore } from '../store/anxietyTestStore';

// Use Universal QuestionsPage component
import UniversalQuestionsPage from '../components/TestFlow/UniversalQuestionsPage';

// Dynamic import functions for resultContent and questionsData
// These will be loaded on-demand to reduce initial bundle size

/**
 * Dynamically load resultContent for a test
 */
async function loadResultContent(testId: string): Promise<any> {
  try {
    const content = await import(`../data/tests/results/${testId}.json`);
    return content.default || content;
  } catch (error) {
    console.error(`Failed to load resultContent for ${testId}:`, error);
    return null;
  }
}

/**
 * Dynamically load questionsData for a test
 */
async function loadQuestionsData(testId: string): Promise<any> {
  try {
    const data = await import(`../data/tests/${testId}/questions.json`);
    return data.default || data;
  } catch (error) {
    console.error(`Failed to load questionsData for ${testId}:`, error);
    return null;
  }
}

// Store mapping - Export for use in UniversalPaymentPage and UniversalUnlockPage
export const storeMap: Record<string, any> = {
  'autism': useAutismTestStore,
  'criticism': useCriticismTestStore,
  'problem-solving': useProblemSolvingTestStore,
  'creative-thinking': useCreativeThinkingTestStore,
  'depression': useDepressionTestStore,
  'multitasking': useMultitaskingTestStore,
  'attention-span': useAttentionSpanTestStore,
  'memory-retention': useMemoryRetentionTestStore,
  'entrepreneur-mindset': useEntrepreneurMindsetTestStore,
  'risk-tolerance': useRiskToleranceTestStore,
  'strategic-thinking': useStrategicThinkingTestStore,
  'time-management': useTimeManagementTestStore,
  'decision-making': useDecisionMakingTestStore,
  'leadership-archetype': useLeadershipArchetypeTestStore,
  'negotiation-skills': useNegotiationSkillsTestStore,
  'stress-management': useStressManagementTestStore,
  'team-player': useTeamPlayerTestStore,
  'success': useSuccessTestStore,
  'perfectionism': usePerfectionismTestStore,
  'ambition': useAmbitionTestStore,
  'anxiety': useAnxietyTestStore,
};

// All tests use UniversalQuestionsPage

// Cache for loaded resultContent and questionsData to avoid re-loading
const resultContentCache: Record<string, any> = {};
const questionsDataCache: Record<string, any> = {};

interface UniversalTestPageProps {
  testId: string;
}

export function UniversalTestPage({ testId }: UniversalTestPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'questions'>('intro');
  
  // Get test config
  const testConfig = getTestConfig(testId);
  
  // Get store from mapping
  const useTestStore = storeMap[testId];
  
  // State for dynamically loaded data
  const [resultContent, setResultContent] = useState<any>(null);
  const [questionsData, setQuestionsData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  // Load resultContent and questionsData dynamically
  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      if (!useTestStore) {
        setDataError('Test store not found');
        setDataLoading(false);
        return;
      }

      try {
        // Check cache first
        let content = resultContentCache[testId];
        let questions = questionsDataCache[testId];

        // Load if not in cache
        if (!content) {
          content = await loadResultContent(testId);
          if (content) {
            resultContentCache[testId] = content;
          }
        }

        if (!questions) {
          questions = await loadQuestionsData(testId);
          if (questions) {
            questionsDataCache[testId] = questions;
          }
        }

        if (isMounted) {
          if (!content || !questions) {
            setDataError(`Failed to load data for test: ${testId}`);
          } else {
            setResultContent(content);
            setQuestionsData(questions);
            setDataError(null);
          }
          setDataLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Error loading test data:', err);
          setDataError(err.message || 'Failed to load test data');
          setDataLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [testId, useTestStore]);

  if (!useTestStore) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      }}>
        <div className="error">
          Test configuration not found for: {testId}
          <br />
          Available tests: {Object.keys(storeMap).join(', ')}
        </div>
      </div>
    );
  }

  if (dataLoading) {
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

  if (dataError || !resultContent || !questionsData) {
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
          <div className="error" style={{ marginBottom: '20px' }}>
            {dataError || 'Failed to load test data'}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setDataError(null);
              setDataLoading(true);
              // Retry loading
              loadResultContent(testId).then(content => {
                if (content) {
                  resultContentCache[testId] = content;
                  setResultContent(content);
                }
              });
              loadQuestionsData(testId).then(questions => {
                if (questions) {
                  questionsDataCache[testId] = questions;
                  setQuestionsData(questions);
                }
                setDataLoading(false);
              });
            }}
          >
            {t('common.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  const {
    step,
    questions,
    resultLevel,
    resultData,
    setStep,
    setQuestions,
    setTimeRemaining,
    calculateScore,
    setResultData,
    setEmail,
  } = useTestStore();

  // Initialize component - only run once on mount
  useEffect(() => {
    // Check if we're coming from unlock page with results step
    if (location.state && (location.state as any).step === 'results') {
      setStep('results');
      setIsInitialized(true);
      return;
    }
    
    const store = useTestStore.getState();
    const storeStep = store.step;
    
    // Only reset to landing if we're actually starting fresh
    if (!storeStep || storeStep === 'landing') {
      store.setCurrentQuestionIndex(0);
      setStep('landing');
      setPhase('intro');
    } else {
      setStep(storeStep);
    }
    
    try {
      const storeQuestions = store.questions;
      
      if (storeQuestions.length === 0 && questionsData && questionsData.length > 0) {
        setQuestions(questionsData);
      }
    } catch (err: any) {
      console.error('Error loading questions:', err);
      setError(err.message || 'Failed to load questions');
    }
    
    setIsInitialized(true);
  }, []); // Only run on mount

  // Handle location state changes
  useEffect(() => {
    if (location.state && (location.state as any).step === 'results') {
      setStep('results');
    }
  }, [location.state, setStep]);

  useEffect(() => {
    console.log('🔄 Step changed to:', step);
    
    if (step === 'questions') {
      const store = useTestStore.getState();
      const storeQuestions = store.questions;
      
      if (storeQuestions.length === 0) {
        if (questionsData && questionsData.length > 0) {
          setQuestions(questionsData);
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
    const store = useTestStore.getState();
    const storeQuestions = store.questions;
    
    if (storeQuestions.length === 0) {
      if (questionsData && questionsData.length > 0) {
        setQuestions(questionsData);
      } else {
        setError('Questions data not available');
        return;
      }
    }

    store.setCurrentQuestionIndex(0);
    
    const timerSeconds = 10 * 60; // 10 minutes
    store.setTimeRemaining(timerSeconds);
    
    useTestStore.setState({ answers: [] });
    useTestStore.setState({ totalScore: 0 });
    useTestStore.setState({ resultLevel: null });
    
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
      
      const storeAfterSet = useTestStore.getState();
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
      
      let store = useTestStore.getState();
      if (!store.resultLevel) {
        console.log('⚠️ No resultLevel found, calculating score...');
        calculateScore();
        await new Promise(resolve => setTimeout(resolve, 200));
        store = useTestStore.getState();
      }
      
      const level = store.resultLevel || 'good';
      console.log('📊 Result level:', level);
      
      const result = resultContent[level];
      setResultData(result);
      console.log('✅ Result data set for level:', level);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('➡️ Transitioning to email screen...');
      const storeInstance = useTestStore.getState();
      storeInstance.setStep('email');
      setStep('email');
      
      await new Promise(resolve => setTimeout(resolve, 50));
      const storeAfterSet = useTestStore.getState();
      console.log('✅ Step set to:', storeAfterSet.step);
      console.log('✅ Component step:', step);
    } catch (err: any) {
      console.error('❌ Error in handleAnalyzingComplete:', err);
      const result = resultContent['good'];
      setResultData(result);
      const storeInstance = useTestStore.getState();
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
    
    const store = useTestStore.getState();
    if (!store.sessionToken) {
      const tempToken = `temp_${Date.now()}`;
      store.setSessionToken(tempToken);
    }
    
    navigate(`/test/${testId}/payment`);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const store = useTestStore.getState();
      if (store.step === 'questions' && store.answers.length > 0) {
        e.preventDefault();
        e.returnValue = t(`tests.${testId}.warnings.leave_page`) || 'If you leave this page, your current test progress will be lost. Continue?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [t, testId]);

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
      const currentQuestionsFromStore = useTestStore.getState().questions;
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
            <UniversalQuestionsPage
              testId={testId}
              questions={questionsToUse}
              onComplete={handleQuestionsComplete}
              useTestStore={useTestStore}
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

