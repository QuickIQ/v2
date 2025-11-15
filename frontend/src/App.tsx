import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import i18n from './i18n/config';
import { Header } from './components/layout/Header';
import Home from './pages/Home';
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
import DecisionMakingTestPage from './pages/DecisionMakingTestPage';
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
import DecisionMakingPaymentPage from './tests/iq/decision-making/DecisionMakingPaymentPage';
import DecisionMakingUnlockPage from './tests/iq/decision-making/DecisionMakingUnlockPage';
import LeadershipArchetypeTestPage from './pages/LeadershipArchetypeTestPage';
import LeadershipArchetypePaymentPage from './tests/iq/leadership-archetype/LeadershipArchetypePaymentPage';
import LeadershipArchetypeUnlockPage from './tests/iq/leadership-archetype/LeadershipArchetypeUnlockPage';
import NegotiationSkillsTestPage from './pages/NegotiationSkillsTestPage';
import NegotiationSkillsPaymentPage from './tests/iq/negotiation-skills/NegotiationSkillsPaymentPage';
import NegotiationSkillsUnlockPage from './tests/iq/negotiation-skills/NegotiationSkillsUnlockPage';
import StressManagementTestPage from './pages/StressManagementTestPage';
import StressManagementPaymentPage from './tests/iq/stress-management/StressManagementPaymentPage';
import StressManagementUnlockPage from './tests/iq/stress-management/StressManagementUnlockPage';
import TeamPlayerTestPage from './pages/TeamPlayerTestPage';
import TeamPlayerPaymentPage from './tests/iq/team-player/TeamPlayerPaymentPage';
import TeamPlayerUnlockPage from './tests/iq/team-player/TeamPlayerUnlockPage';
import SuccessTestPage from './pages/SuccessTestPage';
import SuccessPaymentPage from './tests/iq/success/SuccessPaymentPage';
import SuccessUnlockPage from './tests/iq/success/SuccessUnlockPage';
import PerfectionismTestPage from './pages/PerfectionismTestPage';
import PerfectionismPaymentPage from './tests/iq/perfectionism/PerfectionismPaymentPage';
import PerfectionismUnlockPage from './tests/iq/perfectionism/PerfectionismUnlockPage';
import AmbitionTestPage from './pages/AmbitionTestPage';
import AmbitionPaymentPage from './tests/iq/ambition/AmbitionPaymentPage';
import AmbitionUnlockPage from './tests/iq/ambition/AmbitionUnlockPage';
import CriticismTestPage from './pages/CriticismTestPage';
import CriticismPaymentPage from './tests/iq/criticism/CriticismPaymentPage';
import CriticismUnlockPage from './tests/iq/criticism/CriticismUnlockPage';
import AutismTestPage from './pages/AutismTestPage';
import AutismPaymentPage from './tests/iq/autism/AutismPaymentPage';
import AutismUnlockPage from './tests/iq/autism/AutismUnlockPage';
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
        <Route path="/test/decision-making" element={<DecisionMakingTestPage />} />
        <Route path="/test/decision-making/payment" element={<DecisionMakingPaymentPage />} />
        <Route path="/test/decision-making/unlock/:level" element={<DecisionMakingUnlockPage />} />
        <Route path="/test/decision-making/unlock" element={<DecisionMakingUnlockPage />} />
        <Route path="/test/leadership-archetype" element={<LeadershipArchetypeTestPage />} />
        <Route path="/test/leadership-archetype/payment" element={<LeadershipArchetypePaymentPage />} />
        <Route path="/test/leadership-archetype/unlock/:level" element={<LeadershipArchetypeUnlockPage />} />
        <Route path="/test/leadership-archetype/unlock" element={<LeadershipArchetypeUnlockPage />} />
        <Route path="/test/negotiation-skills" element={<NegotiationSkillsTestPage />} />
        <Route path="/test/negotiation-skills/payment" element={<NegotiationSkillsPaymentPage />} />
        <Route path="/test/negotiation-skills/unlock/:level" element={<NegotiationSkillsUnlockPage />} />
        <Route path="/test/negotiation-skills/unlock" element={<NegotiationSkillsUnlockPage />} />
        <Route path="/test/stress-management" element={<StressManagementTestPage />} />
        <Route path="/test/stress-management/payment" element={<StressManagementPaymentPage />} />
        <Route path="/test/stress-management/unlock/:level" element={<StressManagementUnlockPage />} />
        <Route path="/test/stress-management/unlock" element={<StressManagementUnlockPage />} />
        <Route path="/test/team-player" element={<TeamPlayerTestPage />} />
        <Route path="/test/team-player/payment" element={<TeamPlayerPaymentPage />} />
        <Route path="/test/team-player/unlock/:level" element={<TeamPlayerUnlockPage />} />
        <Route path="/test/team-player/unlock" element={<TeamPlayerUnlockPage />} />
        <Route path="/test/success" element={<SuccessTestPage />} />
        <Route path="/test/success/payment" element={<SuccessPaymentPage />} />
        <Route path="/test/success/unlock/:level" element={<SuccessUnlockPage />} />
        <Route path="/test/success/unlock" element={<SuccessUnlockPage />} />
        <Route path="/test/perfectionism" element={<PerfectionismTestPage />} />
        <Route path="/test/perfectionism/payment" element={<PerfectionismPaymentPage />} />
        <Route path="/test/perfectionism/unlock/:level" element={<PerfectionismUnlockPage />} />
        <Route path="/test/perfectionism/unlock" element={<PerfectionismUnlockPage />} />
        <Route path="/test/ambition" element={<AmbitionTestPage />} />
        <Route path="/test/ambition/payment" element={<AmbitionPaymentPage />} />
        <Route path="/test/ambition/unlock/:level" element={<AmbitionUnlockPage />} />
        <Route path="/test/ambition/unlock" element={<AmbitionUnlockPage />} />
        <Route path="/test/criticism" element={<CriticismTestPage />} />
        <Route path="/test/criticism/payment" element={<CriticismPaymentPage />} />
        <Route path="/test/criticism/unlock/:level" element={<CriticismUnlockPage />} />
        <Route path="/test/criticism/unlock" element={<CriticismUnlockPage />} />
        <Route path="/test/autism" element={<AutismTestPage />} />
        <Route path="/test/autism/payment" element={<AutismPaymentPage />} />
        <Route path="/test/autism/unlock/:level" element={<AutismUnlockPage />} />
        <Route path="/test/autism/unlock" element={<AutismUnlockPage />} />
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

