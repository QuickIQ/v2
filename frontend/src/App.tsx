import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import i18n from './i18n/config';
import { Header } from './components/layout/Header';
import Home from './pages/Home';
import TestFlow from './pages/TestFlow';
import IQTestPage from './pages/IQTestPage';
import PersonalityTestPage from './pages/PersonalityTestPage';
import CreativeThinkingTestPage from './pages/CreativeThinkingTestPage';
import DepressionTestPage from './pages/DepressionTestPage';
import MultitaskingTestPage from './pages/MultitaskingTestPage';
import AttentionSpanTestPage from './pages/AttentionSpanTestPage';
import MemoryRetentionTestPage from './pages/MemoryRetentionTestPage';
import AnxietyTestPage from './pages/AnxietyTestPage';
import ProblemSolvingTestPage from './pages/ProblemSolvingTestPage';
import EntrepreneurMindsetTestPage from './pages/EntrepreneurMindsetTestPage';
import RiskToleranceTestPage from './pages/RiskToleranceTestPage';
import StrategicThinkingTestPage from './pages/StrategicThinkingTestPage';
import TimeManagementTestPage from './pages/TimeManagementTestPage';
import PaymentPage from './tests/personality/PaymentPage';
import UnlockPage from './tests/personality/UnlockPage';
import CreativeThinkingPaymentPage from './tests/iq/creative-thinking/CreativeThinkingPaymentPage';
import CreativeThinkingUnlockPage from './tests/iq/creative-thinking/CreativeThinkingUnlockPage';
import DepressionPaymentPage from './tests/iq/depression/DepressionPaymentPage';
import DepressionUnlockPage from './tests/iq/depression/DepressionUnlockPage';
import MultitaskingPaymentPage from './tests/iq/multitasking/MultitaskingPaymentPage';
import MultitaskingUnlockPage from './tests/iq/multitasking/MultitaskingUnlockPage';
import AttentionSpanPaymentPage from './tests/iq/attention-span/AttentionSpanPaymentPage';
import AttentionSpanUnlockPage from './tests/iq/attention-span/AttentionSpanUnlockPage';
import MemoryRetentionPaymentPage from './tests/iq/memory-retention/MemoryRetentionPaymentPage';
import MemoryRetentionUnlockPage from './tests/iq/memory-retention/MemoryRetentionUnlockPage';
import AnxietyPaymentPage from './tests/iq/anxiety/AnxietyPaymentPage';
import AnxietyUnlockPage from './tests/iq/anxiety/AnxietyUnlockPage';
import ProblemSolvingPaymentPage from './tests/iq/problem-solving/ProblemSolvingPaymentPage';
import ProblemSolvingUnlockPage from './tests/iq/problem-solving/ProblemSolvingUnlockPage';
import EntrepreneurMindsetPaymentPage from './tests/iq/entrepreneur-mindset/EntrepreneurMindsetPaymentPage';
import EntrepreneurMindsetUnlockPage from './tests/iq/entrepreneur-mindset/EntrepreneurMindsetUnlockPage';
import RiskTolerancePaymentPage from './tests/iq/risk-tolerance/RiskTolerancePaymentPage';
import RiskToleranceUnlockPage from './tests/iq/risk-tolerance/RiskToleranceUnlockPage';
import StrategicThinkingPaymentPage from './tests/iq/strategic-thinking/StrategicThinkingPaymentPage';
import StrategicThinkingUnlockPage from './tests/iq/strategic-thinking/StrategicThinkingUnlockPage';
import TimeManagementPaymentPage from './tests/iq/time-management/TimeManagementPaymentPage';
import TimeManagementUnlockPage from './tests/iq/time-management/TimeManagementUnlockPage';
import { useDynamicTestTranslations } from './hooks/useDynamicTestTranslations';
import './App.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Inner component to use hooks (hooks must be inside Router)
function AppContent() {
  useDynamicTestTranslations();
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:slug" element={<TestFlow />} />
        <Route path="/test/iqtest" element={<IQTestPage />} />
        <Route path="/test/personality" element={<PersonalityTestPage />} />
        <Route path="/test/personality/payment" element={<PaymentPage />} />
        <Route path="/test/personality/unlock" element={<UnlockPage />} />
        <Route path="/test/creative-thinking" element={<CreativeThinkingTestPage />} />
        <Route path="/test/creative-thinking/payment" element={<CreativeThinkingPaymentPage />} />
        <Route path="/test/creative-thinking/unlock/:level" element={<CreativeThinkingUnlockPage />} />
        <Route path="/test/creative-thinking/unlock" element={<CreativeThinkingUnlockPage />} />
        <Route path="/test/depression" element={<DepressionTestPage />} />
        <Route path="/test/depression/payment" element={<DepressionPaymentPage />} />
        <Route path="/test/depression/unlock/:level" element={<DepressionUnlockPage />} />
        <Route path="/test/depression/unlock" element={<DepressionUnlockPage />} />
        <Route path="/test/multitasking" element={<MultitaskingTestPage />} />
        <Route path="/test/multitasking/payment" element={<MultitaskingPaymentPage />} />
        <Route path="/test/multitasking/unlock/:level" element={<MultitaskingUnlockPage />} />
        <Route path="/test/multitasking/unlock" element={<MultitaskingUnlockPage />} />
        <Route path="/test/attention-span" element={<AttentionSpanTestPage />} />
        <Route path="/test/attention-span/payment" element={<AttentionSpanPaymentPage />} />
        <Route path="/test/attention-span/unlock/:level" element={<AttentionSpanUnlockPage />} />
        <Route path="/test/attention-span/unlock" element={<AttentionSpanUnlockPage />} />
        <Route path="/test/memory-retention" element={<MemoryRetentionTestPage />} />
        <Route path="/test/memory-retention/payment" element={<MemoryRetentionPaymentPage />} />
        <Route path="/test/memory-retention/unlock/:level" element={<MemoryRetentionUnlockPage />} />
        <Route path="/test/memory-retention/unlock" element={<MemoryRetentionUnlockPage />} />
        <Route path="/test/anxiety" element={<AnxietyTestPage />} />
        <Route path="/test/anxiety/payment" element={<AnxietyPaymentPage />} />
        <Route path="/test/anxiety/unlock/:level" element={<AnxietyUnlockPage />} />
        <Route path="/test/anxiety/unlock" element={<AnxietyUnlockPage />} />
        <Route path="/test/problem-solving" element={<ProblemSolvingTestPage />} />
        <Route path="/test/problem-solving/payment" element={<ProblemSolvingPaymentPage />} />
        <Route path="/test/problem-solving/unlock/:level" element={<ProblemSolvingUnlockPage />} />
        <Route path="/test/problem-solving/unlock" element={<ProblemSolvingUnlockPage />} />
        <Route path="/test/entrepreneur-mindset" element={<EntrepreneurMindsetTestPage />} />
        <Route path="/test/entrepreneur-mindset/payment" element={<EntrepreneurMindsetPaymentPage />} />
        <Route path="/test/entrepreneur-mindset/unlock/:level" element={<EntrepreneurMindsetUnlockPage />} />
        <Route path="/test/entrepreneur-mindset/unlock" element={<EntrepreneurMindsetUnlockPage />} />
        <Route path="/test/risk-tolerance" element={<RiskToleranceTestPage />} />
        <Route path="/test/risk-tolerance/payment" element={<RiskTolerancePaymentPage />} />
        <Route path="/test/risk-tolerance/unlock/:level" element={<RiskToleranceUnlockPage />} />
        <Route path="/test/risk-tolerance/unlock" element={<RiskToleranceUnlockPage />} />
        <Route path="/test/strategic-thinking" element={<StrategicThinkingTestPage />} />
        <Route path="/test/strategic-thinking/payment" element={<StrategicThinkingPaymentPage />} />
        <Route path="/test/strategic-thinking/unlock/:level" element={<StrategicThinkingUnlockPage />} />
        <Route path="/test/strategic-thinking/unlock" element={<StrategicThinkingUnlockPage />} />
        <Route path="/test/time-management" element={<TimeManagementTestPage />} />
        <Route path="/test/time-management/payment" element={<TimeManagementPaymentPage />} />
        <Route path="/test/time-management/unlock/:level" element={<TimeManagementUnlockPage />} />
        <Route path="/test/time-management/unlock" element={<TimeManagementUnlockPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Elements stripe={stripePromise}>
        <Router>
          <AppContent />
        </Router>
      </Elements>
    </I18nextProvider>
  );
}

export default App;

