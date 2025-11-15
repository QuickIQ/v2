import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useLeadershipArchetypeTestStore } from '../../../store/leadershipArchetypeTestStore';

export default function LeadershipArchetypeUnlockPage() {
  return <UniversalUnlockPage testId="leadership-archetype" useTestStore={ useLeadershipArchetypeTestStore } />;
}
