import { memo } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';

type TrackerHeaderItemType = {
  title: string;
  value: string | number;
  titleColor: ColorValue;
  subtitleColor: ColorValue;
};

export const TrackerHeaderItem = memo(
  ({ title, value, titleColor, subtitleColor }: TrackerHeaderItemType) => {
    return (
      <View style={styles.item}>
        <CustomText
          size={TextSize.S_XL}
          weight={TextWeight.MEDIUM}
          style={{ color: titleColor }}>
          {title}
        </CustomText>
        <CustomText size={TextSize.S_LG} style={{ color: subtitleColor }}>
          {value}
        </CustomText>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
});
