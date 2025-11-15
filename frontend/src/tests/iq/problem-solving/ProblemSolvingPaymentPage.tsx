import UniversalPaymentPage from '../../../components/TestFlow/UniversalPaymentPage';
import { useProblemSolvingTestStore } from '../../../store/problemsolvingTestStore';

export default function ProblemSolvingPaymentPage() {
  return <UniversalPaymentPage testId="problem-solving" useTestStore={useProblemSolvingTestStore} />;
}
