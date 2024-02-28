import { ColorValue, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  Easing,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CardItem } from './CardItem/CardItem';

const { width, height } = Dimensions.get('window');

interface CardContainerProps {
  id: number;
  color: string[];
  textColor: ColorValue;
  priority: SharedValue<number>;
  firstPriority: SharedValue<number>;
  secondPriority: SharedValue<number>;
  thirdPriority: SharedValue<number>;
  active: number;
  onPenSetActive: () => void;
  text: string;
}

export const CardContainer = (props: CardContainerProps) => {
  const {
    color,
    textColor,
    id,
    priority,
    firstPriority,
    secondPriority,
    thirdPriority,
    active,
    onPenSetActive,
    text,
  } = props;

  const yTranslation = useSharedValue(30);
  const rotation = useSharedValue(30);
  const isRightFlick = useSharedValue(true);

  const isActive = id === active;

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(({ absoluteX, translationY }) => {
      if (!isActive) {
        return;
      }

      if (absoluteX < width / 2) {
        isRightFlick.value = false;
      }

      yTranslation.value = translationY + 30;
      rotation.value = translationY + 30;
    })
    .onUpdate(({ translationY }) => {
      if (!isActive) {
        return;
      }

      yTranslation.value = translationY + 30;
      rotation.value = translationY + 30;
    })
    .onEnd(() => {
      if (!isActive) {
        return;
      } else {
        onPenSetActive();
      }

      const priorities = [
        firstPriority.value,
        secondPriority.value,
        thirdPriority.value,
      ];
      const lastItem = priorities[priorities.length - 1];

      for (let i = priorities.length - 1; i > 0; i--) {
        priorities[i] = priorities[i - 1];
      }

      priorities[0] = lastItem;

      firstPriority.value = priorities[0];
      secondPriority.value = priorities[1];
      thirdPriority.value = priorities[2];

      yTranslation.value = withTiming(
        30,
        {
          duration: 400,
          easing: Easing.quad,
        },
        () => {
          isRightFlick.value = true;
        },
      );

      rotation.value = withTiming(
        -1280,
        {
          duration: 400,
          easing: Easing.linear,
        },
        () => {
          rotation.value = 30;
        },
      );
    });

  const style = useAnimatedStyle(() => {
    const getPosition = () => {
      switch (priority.value) {
        case 1:
          return 50;
        case 0.9:
          return 75;
        case 0.8:
          return 100;
        default:
          return 0;
      }
    };

    return {
      position: 'absolute',
      height: 235,
      width: 355,
      bottom: withTiming(getPosition() + 100, { duration: 500 }),
      zIndex: priority.value * 100,
      transform: [
        { translateY: yTranslation.value },
        {
          rotate: `${interpolate(
            rotation.value,
            isRightFlick.value ? [30, height] : [30, -height],
            [0, 4],
          )}rad`,
        },
        {
          scale: withTiming(priority.value, {
            duration: 250,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <CardItem color={color} textColor={textColor} text={text} style={style} />
    </GestureDetector>
  );
};
