import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  avatar: {
    position: 'relative',
    borderWidth: 2,
    borderRadius: moderateScale(150),
    alignSelf: 'center',
  },
  icon: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -moderateScale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  place: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeCircle: {
    width: moderateScale(18),
    height: moderateScale(17),
    borderRadius: moderateScale(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeText: {
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  name: {
    textAlign: 'center',
  },
  coin: {
    flexDirection: 'row',
    marginTop: moderateScale(5),
    alignItems: 'center',
    gap: moderateScale(5),
  },
});
