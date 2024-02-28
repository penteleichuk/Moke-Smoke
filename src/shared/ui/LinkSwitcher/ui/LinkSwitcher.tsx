import React from 'react';
import { ColorValue, Switch, View } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './LinkSwitcherStyle';

type LinkSwitcherProps = {
  name: string;
  value: boolean;
  Icon?: React.ElementType;
  colorIcon: ColorValue;
  backgroundColorIcon: ColorValue;
  textColor: ColorValue;
  trackColorOn: ColorValue;
  trackColorOff: ColorValue;
  onValueChange: (value: boolean) => void;
};

export const LinkSwitcher = React.memo((props: LinkSwitcherProps) => {
  const {
    name,
    value,
    onValueChange,
    Icon,
    colorIcon,
    backgroundColorIcon,
    trackColorOn,
    trackColorOff,
    textColor,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.first}>
        {Icon && (
          <View style={[styles.icon, { backgroundColor: backgroundColorIcon }]}>
            <Icon
              width={moderateScale(18)}
              height={moderateScale(18)}
              fill={colorIcon}
            />
          </View>
        )}
        <CustomText
          weight={TextWeight.MEDIUM}
          size={TextSize.S_2XL}
          style={{ color: textColor }}>
          {name}
        </CustomText>
      </View>
      <Switch
        trackColor={{
          false: trackColorOff,
          true: trackColorOn,
        }}
        ios_backgroundColor={trackColorOff}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
});
