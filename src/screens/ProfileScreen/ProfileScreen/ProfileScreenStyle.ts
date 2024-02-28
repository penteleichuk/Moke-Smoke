import { StyleSheet } from 'react-native';
import {
  CONTENT_RADIUS,
  MAIN_HORIZONTAL,
  MAIN_VERTICAL,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: MAIN_HORIZONTAL,
  },
  profile: {
    alignItems: 'center',
    paddingTop: moderateScale(10),
    gap: moderateScale(7),
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(5),
  },
  content: {
    marginTop: -moderateScale(25),
    marginBottom: MAIN_VERTICAL,
    borderWidth: 1,
    padding: moderateScale(15),
    borderRadius: CONTENT_RADIUS,
  },
  button: {
    marginBottom: MAIN_VERTICAL,
  },
});
