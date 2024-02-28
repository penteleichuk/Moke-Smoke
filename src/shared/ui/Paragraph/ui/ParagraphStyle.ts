import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingLeft: moderateScale(30),
  },
  line: {
    position: 'absolute',
    top: 1,
    left: 4.5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  gradient: {
    flex: 1,
    width: 7,
  },
  gradientRadius: {
    borderRadius: moderateScale(30),
  },
  circle: {
    flex: 1,
    top: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleItem: {
    width: moderateScale(15),
    height: moderateScale(15),
    borderRadius: 50,
    borderWidth: 3,
  },
  text: {
    flexShrink: 1,
    paddingBottom: moderateScale(25),
  },
  lastText: {
    paddingBottom: 0,
  },
  title: {
    marginTop: -3,
    marginBottom: moderateScale(5),
  },
  description: {
    flexDirection: 'row',
  },
});
