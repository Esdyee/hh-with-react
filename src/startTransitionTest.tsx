import { useTransition } from 'react';

const StartTransitionTest = () => {
  const [isPending, startTransition] = useTransition();

  return <div>StartTransitionTest</div>;
};

export default StartTransitionTest;
