import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { usePerfectionismTestStore } from '../../../store/perfectionismTestStore';

export default function PerfectionismPaymentPage() {
  return <UniversalPaymentPage testId="perfectionism" useTestStore={usePerfectionismTestStore} />;
}
