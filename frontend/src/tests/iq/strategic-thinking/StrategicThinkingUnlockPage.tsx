import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useStrategicThinkingTestStore } from '../../../store/strategicThinkingTestStore';

export default function StrategicThinkingUnlockPage() {
  return <UniversalUnlockPage testId="strategic-thinking" useTestStore={ useStrategicThinkingTestStore } />;
}
