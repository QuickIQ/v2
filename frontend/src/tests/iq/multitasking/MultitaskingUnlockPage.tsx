import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useMultitaskingTestStore } from '../../../store/multitaskingTestStore';

export default function MultitaskingUnlockPage() {
  return <UniversalUnlockPage testId="multitasking" useTestStore={ useMultitaskingTestStore } />;
}
