import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useAmbitionTestStore } from '../../../store/ambitionTestStore';

export default function AmbitionPaymentPage() {
  return <UniversalPaymentPage testId="ambition" useTestStore={useAmbitionTestStore} />;
}
