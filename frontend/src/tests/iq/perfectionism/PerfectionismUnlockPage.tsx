import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { usePerfectionismTestStore } from '../../../store/perfectionismTestStore';

export default function PerfectionismUnlockPage() {
  return <UniversalUnlockPage testId="perfectionism" useTestStore={ usePerfectionismTestStore } />;
}
