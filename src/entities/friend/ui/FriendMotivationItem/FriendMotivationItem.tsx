import { memo } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';
import { abbreviateNumber } from 'shared/lib/format/abbreviateNumber';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextWeight } from 'shared/ui/CustomText';
import { styles } from './FriendMotivationItemStyle';

interface FriendMotivationItemProps {
  value: number;
  Icon: ImageSourcePropType;
}

const ICON_SIZE = moderateScale(25);

export const FriendMotivationItem = memo((props: FriendMotivationItemProps) => {
  const { value, Icon } = props;
  const { cn } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cn('slate.800', 'slate.100') },
      ]}>
      <Image
        source={Icon}
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
        }}
      />
      <CustomText
        weight={TextWeight.MEDIUM}
        style={{ color: cn('white', 'slate.700') }}>
        {abbreviateNumber(value, 0)}
      </CustomText>
    </View>
  );
});
