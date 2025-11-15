import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useCriticismTestStore } from '../../../store/criticismTestStore';

export default function CriticismPaymentPage() {
  return <UniversalPaymentPage testId="criticism" useTestStore={useCriticismTestStore} />;
}
