import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useEntrepreneurMindsetTestStore } from '../../../store/entrepreneurmindsetTestStore';

export default function EntrepreneurMindsetPaymentPage() {
  return <UniversalPaymentPage testId="entrepreneur-mindset" useTestStore={useEntrepreneurMindsetTestStore} />;
}
