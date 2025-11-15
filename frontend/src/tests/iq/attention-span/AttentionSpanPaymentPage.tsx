import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useAttentionSpanTestStore } from '../../../store/attentionspanTestStore';

export default function AttentionSpanPaymentPage() {
  return <UniversalPaymentPage testId="attention-span" useTestStore={useAttentionSpanTestStore} />;
}
