import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useTeamPlayerTestStore } from '../../../store/teamPlayerTestStore';

export default function TeamPlayerUnlockPage() {
  return <UniversalUnlockPage testId="team-player" useTestStore={ useTeamPlayerTestStore } />;
}
