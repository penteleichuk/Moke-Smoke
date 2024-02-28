import React from 'react';
import { View } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme';
import { CustomText } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './NavigationSplashItemStyle';

interface NavigationSplashProps {
  onPress: () => void;
  Icon: React.ElementType;
  active?: boolean;
  disabled?: boolean;
  text?: string;
}

const ICON_SIZE = moderateScale(20);

export const NavigationSplashItem = (props: NavigationSplashProps) => {
  const { onPress, Icon, active, disabled, text } = props;
  const { cn } = useTheme();

  return (
    <View style={styles.container}>
      <PressableOpacity
        style={[
          styles.pressable,
          { borderColor: cn('white', 'slate.800') },
          active && {
            borderColor: cn('indigo.500'),
            backgroundColor: cn('indigo.500'),
          },
          !!text && styles.pressableText,
          disabled && styles.disabled,
        ]}
        disabled={disabled}
        onPress={onPress}>
        {!text && (
          <Icon
            style={styles.icon}
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={active ? cn('white', 'slate.200') : cn('white', 'slate.800')}
          />
        )}
        {text && (
          <CustomText style={{ color: cn('white', 'slate.200') }}>
            {text}
          </CustomText>
        )}
      </PressableOpacity>
    </View>
  );
};
