import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useDecisionMakingTestStore } from '../../../store/decisionMakingTestStore';

export default function DecisionMakingUnlockPage() {
  return <UniversalUnlockPage testId="decision-making" useTestStore={ useDecisionMakingTestStore } />;
}
