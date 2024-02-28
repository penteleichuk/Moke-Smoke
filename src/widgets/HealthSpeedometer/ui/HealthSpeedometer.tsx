import Lottie from 'lottie-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, ColorValue, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { CustomText } from 'shared/ui/CustomText';
import { calculateAnimation } from './../model/lib/calculateAnimation/calculateAnimation';
import { styles } from './HealthSpeedometerStyle';

interface HealthSpeedometer {
  isLoading: boolean;
  navigation: number;
  timeInMinutes: number;
  step: number[];
  color: ColorValue;
  backgroundColor: ColorValue;
}

const ANIM_DURATION = 153;
const NEED_MINUTES = 50;

export const HealthSpeedometer = ({
  isLoading,
  step,
  navigation,
  timeInMinutes,
  color,
  backgroundColor,
}: HealthSpeedometer) => {
  const { t } = useTranslation();
  const animationRef = useRef<Lottie>(null);

  const appState = useRef(AppState.currentState);
  const [animationFinish, setAnimationFinish] = useState(false);

  const handleAnimationFinish = () => {
    setAnimationFinish(true);
  };

  const animLoadHandler = useCallback(() => {
    try {
      const timeAnimation = calculateAnimation(
        timeInMinutes,
        NEED_MINUTES,
        ANIM_DURATION,
      );

      animationRef.current?.play(0, timeAnimation);
    } catch {}
  }, [step, navigation, timeInMinutes]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        animLoadHandler();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [step, navigation]);

  // Запускаем анимацию
  useEffect(() => {
    if (isLoading) {
      return;
    }
    animLoadHandler();
  }, [step, navigation, isLoading]);

  return (
    <View style={styles.container}>
      <Lottie
        style={styles.animation}
        source={Anims.Pedometer}
        ref={animationRef}
        onAnimationFinish={handleAnimationFinish}
        loop={false}
      />
      {animationFinish && (
        <View style={[styles.content, { backgroundColor }]}>
          <CustomText style={{ color }}>
            {t('tracker.need', {
              min: timeInMinutes > 50 ? 0 : 50 - timeInMinutes,
            })}
          </CustomText>
        </View>
      )}
    </View>
  );
};
