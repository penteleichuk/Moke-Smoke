import { getVibrationIsEnabled } from 'features/setting/toggle-vibration';
import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  Pressable as PressableOld,
  PressableProps,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { vibrationConfig } from 'shared/config/vibration';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';

type PressableOpacityType = PressableProps & {
  children: React.ReactNode;
  flex?: number;
};

export const PressableOpacity = React.memo((props: PressableOpacityType) => {
  const { children, flex = 0, onPressOut, onPressIn, ...rest } = props;
  const isVibration = useAppSelector(getVibrationIsEnabled);

  const animated = new Animated.Value(1);

  const fadeIn = (event: GestureResponderEvent) => {
    if (isVibration) {
      ReactNativeHapticFeedback.trigger('impactLight', vibrationConfig);
    }

    Animated.timing(animated, {
      toValue: 0.1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    onPressIn && onPressIn(event);
  };

  const fadeOut = (event: GestureResponderEvent) => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    onPressOut && onPressOut(event);
  };

  return (
    <Animated.View style={{ opacity: animated, flexGrow: flex }}>
      <PressableOld
        {...rest}
        onPressIn={fadeIn}
        onPressOut={fadeOut}
        onResponderTerminationRequest={() => false}
        onResponderRelease={event => event.preventDefault()}>
        {children}
      </PressableOld>
    </Animated.View>
  );
});
