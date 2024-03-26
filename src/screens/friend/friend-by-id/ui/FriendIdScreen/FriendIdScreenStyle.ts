import { StyleSheet } from 'react-native';
import { MAIN_VERTICAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: MAIN_VERTICAL,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: moderateScale(15),
  },
  line: {
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  motivation: {
    flex: 1,
    width: '100%',
    marginTop: moderateScale(15),
    padding: moderateScale(20),
  },
  title: {
    paddingBottom: moderateScale(10),
    textAlign: 'center',
  },
  description: {
    paddingBottom: moderateScale(10),
    textAlign: 'center',
  },
  animation: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationWrapper: {
    width: '60%',
    height: moderateScale(100),
  },
});
