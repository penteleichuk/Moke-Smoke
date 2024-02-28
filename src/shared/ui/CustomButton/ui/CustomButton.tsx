import React from 'react';
import { PressableProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextWeight } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './CustomButtonStyle';

type CustomButtonProps = PressableProps & {
  children: React.ReactNode;
  icons?: React.ElementType;
  color?: string;
  flex?: number;
  background: string[];
  radius?: number;
  transparent?: boolean;
  borderColor?: string;
  disabled?: boolean;
};

export const CustomButton = (props: CustomButtonProps) => {
  const { cn } = useTheme();

  const {
    icons: Icons,
    flex = 0,
    disabled = false,
    color = cn('white'),
    background = [cn('transparent'), cn('transparent')],
    radius = 10,
    transparent = false,
    borderColor = cn('transparent'),
    ...rest
  } = props;

  return (
    <PressableOpacity
      flex={1}
      onPress={props.onPress}
      disabled={disabled}
      style={[styles.container, { flex }, disabled && styles.opacity]}
      {...rest}>
      <LinearGradient
        style={[styles.content, { borderRadius: radius, borderColor }]}
        end={{ x: 0.7, y: 1.9 }}
        colors={
          transparent ? [cn('transparent'), cn('transparent')] : background
        }>
        {Icons && (
          <Icons
            width={moderateScale(20)}
            height={moderateScale(20)}
            fill={color}
          />
        )}
        <CustomText
          weight={TextWeight.MEDIUM}
          style={[styles.button, { color }]}>
          {props.children}
        </CustomText>
      </LinearGradient>
    </PressableOpacity>
  );
};
