import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    marginHorizontal: MAIN_HORIZONTAL,
  },
  avoiding: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  link: {
    marginBottom: moderateScale(10),
  },
  socials: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(20),
  },
  or: {
    marginVertical: moderateScale(10),
    textAlign: 'center',
  },
  have: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
