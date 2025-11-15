import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useAutismTestStore } from '../../../store/autismTestStore';

export default function AutismPaymentPage() {
  return <UniversalPaymentPage testId="autism" useTestStore={useAutismTestStore} />;
}
