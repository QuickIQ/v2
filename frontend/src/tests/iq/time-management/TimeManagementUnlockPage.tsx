import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useTimeManagementTestStore } from '../../../store/timeManagementTestStore';

export default function TimeManagementUnlockPage() {
  return <UniversalUnlockPage testId="time-management" useTestStore={ useTimeManagementTestStore } />;
}
