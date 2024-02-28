import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  text: {
    fontFamily: 'Ubuntu-Regular',
  },
  size_xs: {
    fontSize: moderateScale(9),
    // lineHeight: moderateScale(12),
  },
  size_sm: {
    fontSize: moderateScale(10.5),
    // lineHeight: moderateScale(15),
  },
  size_base: {
    fontSize: moderateScale(12),
    // lineHeight: moderateScale(18),
  },
  size_lg: {
    fontSize: moderateScale(13.5),
    // lineHeight: moderateScale(21),
  },
  size_xl: {
    fontSize: moderateScale(15),
    // lineHeight: moderateScale(21),
  },
  size_2xl: {
    fontSize: moderateScale(18),
    // lineHeight: moderateScale(24),
  },
  size_3xl: {
    fontSize: moderateScale(22.5),
    // lineHeight: moderateScale(27),
  },
  size_4xl: {
    fontSize: moderateScale(27),
    // lineHeight: moderateScale(30),
  },
  size_5xl: {
    fontSize: moderateScale(36),
  },
  size_6xl: {
    fontSize: moderateScale(45),
  },
  size_7xl: {
    fontSize: moderateScale(54),
  },
  size_8xl: {
    fontSize: moderateScale(72),
  },
  size_9xl: {
    fontSize: moderateScale(96),
  },
  font_thin: {
    fontWeight: '100',
    fontFamily: 'Ubuntu-Light',
  },
  font_extralight: {
    fontWeight: '200',
    fontFamily: 'Ubuntu-Light',
  },
  font_light: {
    fontWeight: '300',
    fontFamily: 'Ubuntu-Light',
  },
  font_normal: {
    fontWeight: '400',
  },
  font_medium: {
    fontWeight: '500',
    fontFamily: 'Ubuntu-Medium',
  },
  font_semibold: {
    fontWeight: '600',
    fontFamily: 'Ubuntu-Medium',
  },
  font_bold: {
    fontWeight: '700',
    fontFamily: 'Ubuntu-Bold',
  },
  font_extrabold: {
    fontWeight: '800',
    fontFamily: 'Ubuntu-Bold',
  },
  font_black: {
    fontWeight: '900',
    fontFamily: 'Ubuntu-Bold',
  },
  tracking_tighter: {
    letterSpacing: moderateScale(-0.6),
  },
  tracking_tight: {
    letterSpacing: moderateScale(-0.3),
  },
  tracking_normal: {
    letterSpacing: moderateScale(0),
  },
  tracking_wide: {
    letterSpacing: moderateScale(0.3),
  },
  tracking_wider: {
    letterSpacing: moderateScale(0.6),
  },
  tracking_widest: {
    letterSpacing: moderateScale(1.2),
  },
});
