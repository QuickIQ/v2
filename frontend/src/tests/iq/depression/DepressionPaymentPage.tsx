import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useDepressionTestStore } from '../../../store/depressionTestStore';

export default function DepressionPaymentPage() {
  return <UniversalPaymentPage testId="depression" useTestStore={useDepressionTestStore} />;
}
