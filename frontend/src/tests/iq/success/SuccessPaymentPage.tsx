import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useSuccessTestStore } from '../../../store/successTestStore';

export default function SuccessPaymentPage() {
  return <UniversalPaymentPage testId="success" useTestStore={useSuccessTestStore} />;
}
