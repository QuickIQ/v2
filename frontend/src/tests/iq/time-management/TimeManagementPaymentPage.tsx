import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useTimeManagementTestStore } from '../../../store/timemanagementTestStore';

export default function TimeManagementPaymentPage() {
  return <UniversalPaymentPage testId="time-management" useTestStore={useTimeManagementTestStore} />;
}
