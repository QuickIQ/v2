import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useStressManagementTestStore } from '../../../store/stressManagementTestStore';

export default function StressManagementUnlockPage() {
  return <UniversalUnlockPage testId="stress-management" useTestStore={ useStressManagementTestStore } />;
}
