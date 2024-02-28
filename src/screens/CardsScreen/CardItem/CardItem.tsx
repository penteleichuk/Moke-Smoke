import { ColorValue, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './CardItemStyle';

interface CardItemProps {
  color: string[];
  textColor: ColorValue;
  style: object;
  text: string;
}

export const CardItem = (props: CardItemProps) => {
  const { color, textColor, style, text } = props;

  return (
    <Animated.View style={style}>
      <LinearGradient
        style={styles.wrapper}
        end={{ x: 0.7, y: 1.9 }}
        colors={color}>
        <View style={[styles.content]}>
          <CustomText
            size={TextSize.S_LG}
            weight={TextWeight.BOLD}
            style={[styles.text, { color: textColor }]}>
            {text}
          </CustomText>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
