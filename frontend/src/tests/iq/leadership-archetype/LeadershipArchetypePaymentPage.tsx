import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useLeadershipArchetypeTestStore } from '../../../store/leadershiparchetypeTestStore';

export default function LeadershipArchetypePaymentPage() {
  return <UniversalPaymentPage testId="leadership-archetype" useTestStore={useLeadershipArchetypeTestStore} />;
}
