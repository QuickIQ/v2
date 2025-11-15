import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useAmbitionTestStore } from '../../../store/ambitionTestStore';

export default function AmbitionUnlockPage() {
  return <UniversalUnlockPage testId="ambition" useTestStore={useAmbitionTestStore} />;
}

