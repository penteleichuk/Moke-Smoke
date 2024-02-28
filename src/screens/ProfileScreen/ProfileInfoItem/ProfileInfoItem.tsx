import { memo } from 'react';
import { ColorValue, View } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './ProfileInfoItemStyle';

type ProfileInfoItemProps = {
  title: string;
  value: string | number;
  Icon: React.ElementType;
  colorIcon: ColorValue;
  backgroundIcon: ColorValue;
  titleColor: ColorValue;
  valueColor: ColorValue;
};

const ICON_SIZE = moderateScale(20);

export const ProfileInfoItem = memo((props: ProfileInfoItemProps) => {
  const {
    title,
    value,
    Icon,
    colorIcon,
    backgroundIcon,
    titleColor,
    valueColor,
  } = props;

  return (
    <View style={styles.wrapper}>
      {Icon && (
        <View style={[styles.icon, { backgroundColor: backgroundIcon }]}>
          <Icon width={ICON_SIZE} height={ICON_SIZE} fill={colorIcon} />
        </View>
      )}
      <View>
        <CustomText size={TextSize.S_LG} style={{ color: titleColor }}>
          {title}
        </CustomText>
        <CustomText
          size={TextSize.S_LG}
          weight={TextWeight.MEDIUM}
          style={{ color: valueColor }}>
          {value}
        </CustomText>
      </View>
    </View>
  );
});
