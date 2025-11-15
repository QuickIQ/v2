import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useAttentionSpanTestStore } from '../../../store/attentionSpanTestStore';

export default function AttentionSpanUnlockPage() {
  return <UniversalUnlockPage testId="attention-span" useTestStore={ useAttentionSpanTestStore } />;
}
