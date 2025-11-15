import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useAutismTestStore } from '../../../store/autismTestStore';

export default function AutismUnlockPage() {
  return <UniversalUnlockPage testId="autism" useTestStore={useAutismTestStore} />;
}

