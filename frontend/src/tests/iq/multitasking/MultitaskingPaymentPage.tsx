import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useMultitaskingTestStore } from '../../../store/multitaskingTestStore';

export default function MultitaskingPaymentPage() {
  return <UniversalPaymentPage testId="multitasking" useTestStore={useMultitaskingTestStore} />;
}
