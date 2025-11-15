import UniversalUnlockPage from '../../../components/TestFlow/UniversalUnlockPage';
import { useProblemSolvingTestStore } from '../../../store/problemSolvingTestStore';

export default function ProblemSolvingUnlockPage() {
  return <UniversalUnlockPage testId="problem-solving" useTestStore={ useProblemSolvingTestStore } />;
}
