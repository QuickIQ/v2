import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useTeamPlayerTestStore } from '../../../store/teamplayerTestStore';

export default function TeamPlayerPaymentPage() {
  return <UniversalPaymentPage testId="team-player" useTestStore={useTeamPlayerTestStore} />;
}
