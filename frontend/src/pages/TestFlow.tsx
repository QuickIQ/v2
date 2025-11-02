import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { testApi } from '../services/api';
import { Test, Question, Answer, TestResult } from '../types';
import LandingPage from '../components/TestFlow/LandingPage';
import SocialProofPage from '../components/TestFlow/SocialProofPage';
import QuestionsPage from '../components/TestFlow/QuestionsPage';
import CalculatingPage from '../components/TestFlow/CalculatingPage';
import EmailCapturePage from '../components/TestFlow/EmailCapturePage';
import PaymentPage from '../components/TestFlow/PaymentPage';
import ResultsPage from '../components/TestFlow/ResultsPage';

type FlowStep = 'landing' | 'social-proof' | 'questions' | 'calculating' | 'email' | 'payment' | 'results';

function TestFlow() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [step, setStep] = useState<FlowStep>('landing');
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }

    const fetchTest = async () => {
      try {
        const testData = await testApi.getBySlug(slug);
        setTest(testData);
      } catch (err: any) {
        setError(err.message || t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [slug, navigate, t]);

  const handleStart = () => {
    setStep('social-proof');
  };

  const handleContinueFromSocialProof = () => {
    loadQuestions();
  };

  const loadQuestions = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      const questionsData = await testApi.getQuestions(slug);
      setQuestions(questionsData);
      setStep('questions');
      setAnswers([]);
    } catch (err: any) {
      setError(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: number, optionKey: string) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.question_id !== questionId);
      return [...filtered, { question_id: questionId, option_key: optionKey }];
    });
  };

  const handleSubmit = async () => {
    if (!slug || answers.length !== questions.length) {
      setError('Please answer all questions');
      return;
    }

    setStep('calculating');

    try {
      const submission = await testApi.submitAnswers(slug, answers, email);
      setResult(submission.result);
      setSessionId(submission.sessionId);

      if (submission.requiresPayment && test?.is_premium) {
        setStep('payment');
      } else {
        setStep('results');
      }
    } catch (err: any) {
      setError(err.message || t('common.error'));
      setStep('questions');
    }
  };

  const handleEmailSubmit = async (emailValue: string) => {
    setEmail(emailValue);
    
    // After email capture, submit answers to get results
    if (!slug || answers.length !== questions.length) {
      setError('Please answer all questions');
      return;
    }

    setStep('calculating');

    try {
      const submission = await testApi.submitAnswers(slug, answers, emailValue);
      setResult(submission.result);
      setSessionId(submission.sessionId);

      if (submission.requiresPayment && test?.is_premium) {
        setStep('payment');
      } else {
        setStep('results');
      }
    } catch (err: any) {
      setError(err.message || t('common.error'));
      setStep('email');
    }
  };

  const handlePaymentSuccess = () => {
    setStep('results');
  };

  if (loading && step === 'landing') {
    return <div className="loading">{t('common.loading')}</div>;
  }

  if (error && step === 'landing') {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!test) {
    return null;
  }

  switch (step) {
    case 'landing':
      return <LandingPage test={test} onStart={handleStart} />;
    case 'social-proof':
      return <SocialProofPage onContinue={handleContinueFromSocialProof} />;
    case 'questions':
      return (
        <QuestionsPage
          questions={questions}
          answers={answers}
          onAnswerSelect={handleAnswerSelect}
          onSubmit={() => setStep('email')}
        />
      );
    case 'calculating':
      return <CalculatingPage />;
    case 'email':
      return <EmailCapturePage onSubmit={handleEmailSubmit} />;
    case 'payment':
      return (
        <PaymentPage
          test={test}
          sessionId={sessionId!}
          onSuccess={handlePaymentSuccess}
        />
      );
    case 'results':
      return <ResultsPage test={test} result={result!} />;
    default:
      return null;
  }
}

export default TestFlow;

