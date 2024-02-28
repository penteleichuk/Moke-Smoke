import { StyleSheet } from 'react-native';
import {
  CONTENT_PADDING,
  CONTENT_RADIUS,
  MAIN_HORIZONTAL,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: MAIN_HORIZONTAL,
    paddingVertical: CONTENT_PADDING,
  },
  content: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  keyboard: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inputs: { flex: 1 },
  input: {
    borderRadius: CONTENT_RADIUS,
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(30),
    paddingTop: moderateScale(9),
    paddingBottom: moderateScale(9),
    borderWidth: 0,
  },
  limit: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(8),
    borderRadius: CONTENT_RADIUS,
    marginLeft: CONTENT_PADDING,
  },
});
