import React from 'react';
import { ColorValue, View } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { styles } from './SubsSliderItemStyle';

type SubsSliderItemProps = {
  text: string;
  Icon: React.ElementType;
  colorIcon: ColorValue;
  backgroundColorIcon: ColorValue;
  textColor: ColorValue;
};

const ICON_SIZE = moderateScale(20);

export const SubsSliderItem = (props: SubsSliderItemProps) => {
  const { text, colorIcon, Icon, backgroundColorIcon, textColor } = props;
  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: backgroundColorIcon }]}>
        <Icon width={ICON_SIZE} height={ICON_SIZE} fill={colorIcon} />
      </View>
      <View style={styles.text}>
        <CustomText size={TextSize.S_LG} style={{ color: textColor }}>
          {text}
        </CustomText>
      </View>
    </View>
  );
};
