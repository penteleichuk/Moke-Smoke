import { StyleSheet } from 'react-native';
import {
  CONTENT_RADIUS,
  MAIN_HORIZONTAL,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: MAIN_HORIZONTAL,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(20),
  },
  code: {
    padding: moderateScale(15),
    borderRadius: CONTENT_RADIUS,
  },
});
