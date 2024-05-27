// Custom Hook 테스트를 위한 Timer 예제
import { useState, useEffect } from 'react';

function useTimer(initialTime: number) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime: number) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime]);

  return time;
}

export default useTimer;

