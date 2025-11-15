import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useDepressionTestStore } from '../../../store/depressionTestStore';

export default function DepressionUnlockPage() {
  return <UniversalUnlockPage testId="depression" useTestStore={useDepressionTestStore} />;
}
