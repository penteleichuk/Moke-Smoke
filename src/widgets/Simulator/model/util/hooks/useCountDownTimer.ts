import { useCallback, useEffect, useState } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { clockify } from 'shared/lib/utils/clockify';

type useCountDownTimerProps = {
  isStart: boolean;
  setIsStart: (value: boolean) => void;
  seconds?: number;
  onTimerFinished?: () => void;
};

export const useCountDownTimer = (props: useCountDownTimerProps) => {
  const { isStart, setIsStart, seconds = 3601, onTimerFinished } = props;
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);

  if (!secondsLeft) {
    onTimerFinished && onTimerFinished();
  }

  const startTimerHandler = useCallback((time: number) => {
    setIsStart(true);
    setSecondsLeft(time);
  }, []);

  const startTimer = useCallback(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) {
          return secs - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (isStart) {
      startTimer();
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [isStart]);

  // Checks if secondsLeft = 0 and stop timer if so
  useEffect(() => {
    if (secondsLeft === 0) {
      setIsStart(false);
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [secondsLeft]);

  const display = clockify(secondsLeft);

  return {
    display,
    isStart,
    setIsStart,
    setSecondsLeft,
    startTimerHandler,
    onTimerFinished,
  };
};
