import { useEffect, useState } from 'react';
import UniversalLandingPage from '../components/TestFlow/UniversalLandingPage';
import UniversalAnalyzingPage from '../components/TestFlow/UniversalAnalyzingPage';
import { getTestConfig } from './testContentLoader';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalityEmailPage from '../tests/personality/PersonalityEmailPage';

// Dynamic store imports - stores are loaded on-demand to reduce initial bundle size
// Store mapping will be populated lazily as stores are requested

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
    // Failed to load resultContent for ${testId}
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
    // Failed to load questionsData for ${testId}
    return null;
  }
}

// Store mapping - populated lazily via dynamic imports
const storeMapCache: Record<string, any> = {};

// Store import mapping for dynamic loading
const storeImportMap: Record<string, () => Promise<any>> = {
  'autism': () => import('../store/autismTestStore').then(m => m.useAutismTestStore),
  'criticism': () => import('../store/criticismTestStore').then(m => m.useCriticismTestStore),
  'problem-solving': () => import('../store/problemSolvingTestStore').then(m => m.useProblemSolvingTestStore),
  'creative-thinking': () => import('../store/creativeThinkingTestStore').then(m => m.useCreativeThinkingTestStore),
  'depression': () => import('../store/depressionTestStore').then(m => m.useDepressionTestStore),
  'multitasking': () => import('../store/multitaskingTestStore').then(m => m.useMultitaskingTestStore),
  'attention-span': () => import('../store/attentionSpanTestStore').then(m => m.useAttentionSpanTestStore),
  'memory-retention': () => import('../store/memoryRetentionTestStore').then(m => m.useMemoryRetentionTestStore),
  'entrepreneur-mindset': () => import('../store/entrepreneurMindsetTestStore').then(m => m.useEntrepreneurMindsetTestStore),
  'risk-tolerance': () => import('../store/riskToleranceTestStore').then(m => m.useRiskToleranceTestStore),
  'strategic-thinking': () => import('../store/strategicThinkingTestStore').then(m => m.useStrategicThinkingTestStore),
  'time-management': () => import('../store/timeManagementTestStore').then(m => m.useTimeManagementTestStore),
  'decision-making': () => import('../store/decisionMakingTestStore').then(m => m.useDecisionMakingTestStore),
  'leadership-archetype': () => import('../store/leadershipArchetypeTestStore').then(m => m.useLeadershipArchetypeTestStore),
  'negotiation-skills': () => import('../store/negotiationSkillsTestStore').then(m => m.useNegotiationSkillsTestStore),
  'stress-management': () => import('../store/stressManagementTestStore').then(m => m.useStressManagementTestStore),
  'team-player': () => import('../store/teamPlayerTestStore').then(m => m.useTeamPlayerTestStore),
  'success': () => import('../store/successTestStore').then(m => m.useSuccessTestStore),
  'perfectionism': () => import('../store/perfectionismTestStore').then(m => m.usePerfectionismTestStore),
  'ambition': () => import('../store/ambitionTestStore').then(m => m.useAmbitionTestStore),
  'anxiety': () => import('../store/anxietyTestStore').then(m => m.useAnxietyTestStore),
};

/**
 * Get store hook for a test ID, loading it dynamically if not already cached
 */
export async function getTestStore(testId: string): Promise<any> {
  // Return cached store if available
  if (storeMapCache[testId]) {
    return storeMapCache[testId];
  }

  // Load store dynamically
  const importFn = storeImportMap[testId];
  if (!importFn) {
    throw new Error(`Store not found for test: ${testId}`);
  }

  const store = await importFn();
  storeMapCache[testId] = store;
  return store;
}

/**
 * Synchronous store map for backward compatibility
 * Note: Stores must be loaded first via getTestStore() before accessing via storeMap
 */
export const storeMap: Record<string, any> = new Proxy({} as Record<string, any>, {
  get(target, prop: string) {
    // Return cached store if available
    if (storeMapCache[prop]) {
      return storeMapCache[prop];
    }
    // For synchronous access, return a placeholder that will be replaced when store loads
    // This maintains backward compatibility but stores should ideally be loaded async
    return undefined;
  },
  has(target, prop: string) {
    return prop in storeMapCache || prop in storeImportMap;
  },
  ownKeys() {
    return Object.keys(storeImportMap);
  },
});

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
  
  // Load store dynamically
  const [useTestStore, setUseTestStore] = useState<any>(null);
  const [storeLoading, setStoreLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    async function loadStore() {
      try {
        const store = await getTestStore(testId);
        if (isMounted) {
          setUseTestStore(() => store);
          setStoreLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error(`Failed to load store for ${testId}:`, err);
          setStoreLoading(false);
        }
      }
    }
    
    loadStore();
    
    return () => {
      isMounted = false;
    };
  }, [testId]);
  
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

  if (storeLoading) {
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
          Available tests: {Object.keys(storeImportMap).join(', ')}
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
      // Step changed to: ${step}
    
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
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      setError(null);
      
      calculateScore();
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      setStep('analyzing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStep('analyzing');
    }
  };

  const handleAnalyzingComplete = async () => {
    try {
      let store = useTestStore.getState();
      if (!store.resultLevel) {
        calculateScore();
        await new Promise(resolve => setTimeout(resolve, 200));
        store = useTestStore.getState();
      }
      
      const level = store.resultLevel || 'good';
      const result = resultContent[level];
      setResultData(result);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const storeInstance = useTestStore.getState();
      storeInstance.setStep('email');
      setStep('email');
    } catch (err: any) {
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

