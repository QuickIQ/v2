import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useAnxietyTestStore } from '../../../store/anxietyTestStore';

export default function AnxietyPaymentPage() {
  return <UniversalPaymentPage testId="anxiety" useTestStore={useAnxietyTestStore} />;
}
