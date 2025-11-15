import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useStrategicThinkingTestStore } from '../../../store/strategicthinkingTestStore';

export default function StrategicThinkingPaymentPage() {
  return <UniversalPaymentPage testId="strategic-thinking" useTestStore={useStrategicThinkingTestStore} />;
}
