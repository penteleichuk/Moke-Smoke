import React, { memo } from 'react';
import { Image as ImageNative, ImageSourcePropType, View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextWeight } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './ButtonWithMotivationStyle';

type ButtonWithMotivationType = {
  title: string;
  Icon?: React.ElementType;
  Image?: ImageSourcePropType;
  backgroundColor: string;
  onPressRoute: () => void;
};

const ICON_SIZE = moderateScale(40);
const ICON_SIZE_ARROW = moderateScale(13);

export const ButtonWithMotivation = memo((props: ButtonWithMotivationType) => {
  const { title, backgroundColor, onPressRoute, Icon, Image } = props;

  const { cn } = useTheme();

  return (
    <View style={styles.container}>
      <PressableOpacity onPress={onPressRoute}>
        <View
          style={[
            styles.content,
            { backgroundColor, borderColor: cn('slate.800', 'slate.300') },
          ]}>
          <View style={styles.information}>
            <View style={styles.arrow}>
              <Icons.Right
                width={ICON_SIZE_ARROW}
                height={ICON_SIZE_ARROW}
                fill={cn('slate.300', 'slate.600')}
              />
              <Icons.Right
                width={ICON_SIZE_ARROW}
                height={ICON_SIZE_ARROW}
                fill={cn('slate.300', 'slate.600')}
              />
              <Icons.Right
                width={ICON_SIZE_ARROW}
                height={ICON_SIZE_ARROW}
                fill={cn('slate.300', 'slate.600')}
              />
            </View>
            <CustomText
              weight={TextWeight.MEDIUM}
              style={[styles.name, { color: cn('white', 'black') }]}>
              {title}
            </CustomText>
          </View>
          {Icon && <Icon width={ICON_SIZE} height={ICON_SIZE} />}
          {Image && (
            <View>
              <ImageNative source={Image} style={styles.image} />
            </View>
          )}
        </View>
      </PressableOpacity>
    </View>
  );
});
