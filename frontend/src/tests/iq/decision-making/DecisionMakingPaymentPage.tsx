import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useDecisionMakingTestStore } from '../../../store/decisionmakingTestStore';

export default function DecisionMakingPaymentPage() {
  return <UniversalPaymentPage testId="decision-making" useTestStore={useDecisionMakingTestStore} />;
}
