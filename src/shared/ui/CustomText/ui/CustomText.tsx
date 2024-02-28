import React from 'react';
import { Text, TextProps } from 'react-native';
import { styles } from './CustomTextStyle';

type CustomTextType = TextProps & {
  children: React.ReactNode;
  size?: TextSize;
  weight?: TextWeight;
  spacing?: TextSpacing;
};

export enum TextSize {
  S_XS = 'size_xs',
  S_SM = 'size_sm',
  S_BASE = 'size_base',
  S_LG = 'size_lg',
  S_XL = 'size_xl',
  S_2XL = 'size_2xl',
  S_3XL = 'size_3xl',
  S_4XL = 'size_4xl',
  S_5XL = 'size_5xl',
  S_6XL = 'size_6xl',
  S_7XL = 'size_7xl',
  S_8XL = 'size_8xl',
  S_9XL = 'size_9xl',
}

export enum TextWeight {
  THIN = 'font_thin',
  EXTRA_LIGHT = 'font_extralight',
  LIGHT = 'font_light',
  NORMAL = 'font_normal',
  MEDIUM = 'font_medium',
  SEMIBOLD = 'font_semibold',
  BOLD = 'font_bold',
  EXTRA_BOLD = 'font_extrabold',
  BLACK = 'font_black',
}

export enum TextSpacing {
  TIGHTER = 'tracking_tighter',
  TIGHT = 'tracking_tight',
  NORMAL = 'tracking_normal',
  WIDE = 'tracking_wide',
  WIDER = 'tracking_wider',
  WIDEST = 'tracking_widest',
}

export const CustomText = (props: CustomTextType) => {
  const {
    children,
    size = TextSize.S_BASE,
    weight = TextWeight.NORMAL,
    spacing = TextSpacing.NORMAL,
    style,
    ...res
  } = props;

  return (
    <Text
      style={[
        styles.text,
        styles[size],
        styles[weight],
        styles[spacing],
        style,
      ]}
      {...res}>
      {children}
    </Text>
  );
};
