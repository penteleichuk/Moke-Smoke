import { StyleSheet } from 'react-native';
import {
  CONTENT_RADIUS,
  MAIN_HORIZONTAL,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: MAIN_HORIZONTAL,
    paddingBottom: 20,
  },
  content: {
    flexGrow: 1,
    gap: moderateScale(15),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: moderateScale(10),
  },
  wrapper: {
    flex: 1,
    padding: MAIN_HORIZONTAL,
    borderRadius: CONTENT_RADIUS,
  },
  text: {
    fontSize: moderateScale(15),
    lineHeight: 20,
    letterSpacing: 0.5,
  },
});
