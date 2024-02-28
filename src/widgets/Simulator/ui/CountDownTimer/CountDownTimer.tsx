import { getIsAuth } from 'entities/auth';
import { getUserIsQuitting, getUserMotivationUpdate } from 'entities/user';
import { getHowMuchSmoking } from 'features/SetHowMuchSmoke';
import Lottie from 'lottie-react-native';
import { memo, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useAppForegroundState } from 'shared/lib/hooks/useAppForegroundState';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { getSecondsDownTimer } from 'shared/lib/utils/getSecondsDownTimer';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { useCountDownTimer } from './../../model/util/hooks/useCountDownTimer';
import { styles } from './CountDownTimerStyle';

interface CountDownTimerProps {
  isStart: boolean;
  setIsStart: (value: boolean) => void;
}

export const CountDownTimer = memo(
  ({ isStart, setIsStart }: CountDownTimerProps) => {
    const { cn } = useTheme();

    const isQuitting = useAppSelector(getUserIsQuitting);
    const isAuth = useAppSelector(getIsAuth);
    const howOffen = useAppSelector(getHowMuchSmoking);
    const motivationUpdated = useAppSelector(getUserMotivationUpdate);

    const { display, startTimerHandler, setSecondsLeft } = useCountDownTimer({
      isStart,
      setIsStart,
    });

    const foreground = useAppForegroundState();
    useEffect(() => {
      if (foreground) {
        const newTime = motivationUpdated
          ? getSecondsDownTimer(motivationUpdated, howOffen)
          : null;

        newTime ? setSecondsLeft(newTime) : setSecondsLeft(0);
      }
    }, [foreground]);

    const secondsDown = useMemo(() => {
      if (!motivationUpdated) {
        return null;
      }
      return getSecondsDownTimer(motivationUpdated, howOffen);
    }, [motivationUpdated, isAuth]);

    useEffect(() => {
      secondsDown ? setSecondsLeft(secondsDown) : setSecondsLeft(0);
    }, [isStart, secondsDown, isAuth]);

    useEffect(() => {
      if (secondsDown && !isStart && secondsDown > 0 && isQuitting !== null) {
        startTimerHandler(secondsDown);
      }
    }, [motivationUpdated, secondsDown, isAuth]);

    return (
      <View
        style={[
          styles.content,
          { backgroundColor: cn('slate.700', 'slate.100') },
        ]}>
        {isStart ? (
          <CustomText
            size={TextSize.S_XL}
            weight={TextWeight.BOLD}
            style={{
              color: !isStart ? cn('white') : cn('white', 'slate.600'),
            }}>
            {display.displayMins}:{display.displaySecs}
          </CustomText>
        ) : (
          <Lottie
            style={styles.anim}
            source={Anims.Start}
            autoPlay
            resizeMode={'cover'}
          />
        )}
      </View>
    );
  },
);
