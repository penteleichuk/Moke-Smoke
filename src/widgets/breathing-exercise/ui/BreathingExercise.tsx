import { getVibrationIsEnabled } from 'features/setting/toggle-vibration';
import Lottie from 'lottie-react-native';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import * as Anims from 'shared/assets/anims';
import { vibrationConfig } from 'shared/config/vibration';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import {
  BreatheProcess,
  BreatheStatus,
  BreatheTiming,
  EXERCISE_COUNT,
} from './../model/const/breathing-exercise';
import { styles } from './BreathingExerciseStyle';

interface BreathingExerciseProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export const BreathingExercise = memo((props: BreathingExerciseProps) => {
  const { count, setCount } = props;

  const isVibration = useAppSelector(getVibrationIsEnabled);

  const animRef = useRef<Lottie>(null);
  const opacityRef = useRef<Lottie>(null);

  const { t } = useTranslation();
  const { cn } = useTheme();

  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState<BreatheStatus>(BreatheStatus.IDLE);
  const [process, setProcess] = useState<BreatheProcess>(BreatheProcess.IDLE);

  useEffect(() => {
    if (status !== BreatheStatus.START) {
      return;
    }

    const interval = setInterval(() => {
      if (process !== BreatheProcess.START) {
        animRef.current?.resume();
      }

      if (count >= EXERCISE_COUNT) {
        clearInterval(interval);
      }

      setTimer(state => {
        if (state - 1 < 1) {
          clearInterval(interval);

          switch (process) {
            case BreatheProcess.START: {
              setProcess(BreatheProcess.INHALE);
              setTimer(BreatheTiming.inhale);
              animRef.current?.play();
              break;
            }
            case BreatheProcess.INHALE: {
              setProcess(BreatheProcess.EXHALE);
              setTimer(BreatheTiming.exhale);
              break;
            }
            case BreatheProcess.EXHALE: {
              setProcess(BreatheProcess.HOLD);
              setTimer(BreatheTiming.hold);
              break;
            }
            case BreatheProcess.HOLD: {
              setCount(stateCount => stateCount + 1);
              setProcess(BreatheProcess.INHALE);
              setTimer(BreatheTiming.inhale);
              animRef.current?.reset();
              animRef.current?.play();
              break;
            }
          }
        } else {
          if (isVibration) {
            if (process === BreatheProcess.INHALE) {
              ReactNativeHapticFeedback.trigger('impactLight', vibrationConfig);
            } else if (process === BreatheProcess.EXHALE) {
              ReactNativeHapticFeedback.trigger(
                'impactMedium',
                vibrationConfig,
              );
            } else if (process === BreatheProcess.HOLD) {
              ReactNativeHapticFeedback.trigger('impactHeavy', vibrationConfig);
            }
          }
        }
        return state - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [process, status]);

  const processStatus = useMemo(() => {
    if (process === BreatheProcess.INHALE) {
      return cn('amber.400');
    } else if (process === BreatheProcess.EXHALE) {
      return cn('emerald.400');
    } else if (process === BreatheProcess.HOLD) {
      return cn('purple.400');
    } else {
      return cn('white');
    }
  }, [process]);

  const onPressStart = () => {
    if (status === BreatheStatus.IDLE) {
      setStatus(BreatheStatus.START);
      setProcess(BreatheProcess.START);
      setTimer(BreatheTiming.start);
      opacityRef.current?.pause();
    } else if (status === BreatheStatus.START) {
      setStatus(BreatheStatus.STOP);
      animRef.current?.pause();
      opacityRef.current?.play();
    } else if (status === BreatheStatus.STOP) {
      setStatus(BreatheStatus.START);
      opacityRef.current?.pause();
    }
  };

  return (
    <View style={styles.container}>
      {count < EXERCISE_COUNT ? (
        <View style={styles.content}>
          <View>
            {status !== BreatheStatus.IDLE &&
              process !== BreatheProcess.IDLE && (
                <View style={styles.icon}>
                  <CustomText
                    style={[styles.textIcon, { color: processStatus }]}>
                    {t(`breathe.3.round.${process}`)}
                  </CustomText>
                  <CustomText
                    style={[styles.countIcon, { color: cn('white') }]}>
                    {timer}
                  </CustomText>
                </View>
              )}
            <Lottie
              ref={animRef}
              colorFilters={[
                {
                  keypath: 'Shape Layer 1',
                  color: cn('slate.600'),
                },
              ]}
              style={styles.animation}
              resizeMode={'cover'}
              source={Anims.Breathe}
            />
          </View>

          <View style={styles.hold}>
            <PressableOpacity
              onPressIn={onPressStart}
              onPressOut={onPressStart}
              style={[
                styles.opacity,
                status === BreatheStatus.START && styles.opacityActive,
              ]}>
              <Lottie
                ref={opacityRef}
                style={[styles.holdAnimation]}
                resizeMode={'cover'}
                source={Anims.Hold}
                loop={true}
                autoPlay={true}
              />
              <CustomText style={{ color: cn('white', 'black') }}>
                {t('breathe.3.hold')}
              </CustomText>
            </PressableOpacity>
          </View>
        </View>
      ) : (
        <Lottie
          style={styles.success}
          resizeMode={'cover'}
          source={Anims.Star}
          loop={true}
          autoPlay={true}
        />
      )}
    </View>
  );
});
