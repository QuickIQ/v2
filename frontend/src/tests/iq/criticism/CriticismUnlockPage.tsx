import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useCriticismTestStore } from '../../../store/criticismTestStore';

export default function CriticismUnlockPage() {
  return <UniversalUnlockPage testId="criticism" useTestStore={useCriticismTestStore} />;
}

