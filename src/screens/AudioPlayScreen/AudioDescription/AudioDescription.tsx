import { memo } from 'react';
import { ColorValue, View } from 'react-native';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './AudioDescriptionStyle';

type AudioDescriptionProps = {
  title: string;
  description: string;
  titleColor: ColorValue;
  descriptionColor: ColorValue;
};

export const AudioDescription = memo(
  ({
    title,
    description,
    titleColor,
    descriptionColor,
  }: AudioDescriptionProps) => {
    return (
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_XL}
          weight={TextWeight.BOLD}
          style={{ color: titleColor }}>
          {title}
        </CustomText>
        <CustomText size={TextSize.S_LG} style={{ color: descriptionColor }}>
          {description}
        </CustomText>
      </View>
    );
  },
);
