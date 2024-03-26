import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(20),
  },
  content: {
    gap: moderateScale(20),
  },
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5555,
    gap: moderateScale(5),
  },
  textIcon: {
    textTransform: 'uppercase',
  },
  countIcon: {},
  animation: {
    width: moderateScale(280),
    height: moderateScale(280),
  },
  holdAnimation: {
    width: moderateScale(80),
    height: moderateScale(80),
  },
  success: {
    width: '70%',
  },
  hold: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacity: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(15),
    gap: moderateScale(10),
  },
  opacityActive: {
    opacity: 0.5,
  },
  textHold: {},
});
