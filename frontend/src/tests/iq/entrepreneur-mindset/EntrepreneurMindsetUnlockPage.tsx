import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useEntrepreneurMindsetTestStore } from '../../../store/entrepreneurMindsetTestStore';

export default function EntrepreneurMindsetUnlockPage() {
  return <UniversalUnlockPage testId="entrepreneur-mindset" useTestStore={ useEntrepreneurMindsetTestStore } />;
}
