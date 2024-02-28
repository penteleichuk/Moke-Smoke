import { ColorValue, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './ParagraphStyle';

type ParagraphProps = {
  title: string;
  text: string;
  isLast?: boolean;
  color1: ColorValue;
  color2: ColorValue;
  textColor: ColorValue;
};

export const Paragraph = (props: ParagraphProps) => {
  const { title, text, isLast = false, color1, color2, textColor } = props;

  return (
    <View style={[styles.container]}>
      <View style={styles.line}>
        <LinearGradient
          style={[styles.gradient, isLast && styles.gradientRadius]}
          end={{ x: 0, y: 1 }}
          colors={[
            color1 as 'string | number',
            (color2.toString() + '02') as string | number,
          ]}
        />
      </View>
      <View style={styles.circle}>
        <View
          style={[
            styles.circleItem,
            {
              backgroundColor: color1,
              borderColor: color1,
            },
          ]}
        />
      </View>
      <View style={[styles.text, isLast && styles.lastText]}>
        <View style={styles.title}>
          <CustomText
            size={TextSize.S_2XL}
            weight={TextWeight.MEDIUM}
            style={{ color: color1 }}>
            {title}
          </CustomText>
        </View>
        <View style={styles.description}>
          <CustomText size={TextSize.S_LG} style={{ color: textColor }}>
            {text}
          </CustomText>
        </View>
      </View>
    </View>
  );
};
