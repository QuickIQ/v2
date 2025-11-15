import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useCreativeThinkingTestStore } from '../../../store/creativethinkingTestStore';

export default function CreativeThinkingPaymentPage() {
  return <UniversalPaymentPage testId="creative-thinking" useTestStore={useCreativeThinkingTestStore} />;
}
