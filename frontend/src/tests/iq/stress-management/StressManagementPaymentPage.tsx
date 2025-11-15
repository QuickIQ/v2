import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useStressManagementTestStore } from '../../../store/stressmanagementTestStore';

export default function StressManagementPaymentPage() {
  return <UniversalPaymentPage testId="stress-management" useTestStore={useStressManagementTestStore} />;
}
