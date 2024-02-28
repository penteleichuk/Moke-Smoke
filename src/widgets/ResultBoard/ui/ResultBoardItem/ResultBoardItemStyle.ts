import { StyleSheet } from 'react-native';
import {
  CONTENT_IN_RADIUS,
  CONTENT_PADDING,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    maxWidth: '50%',
    borderWidth: 1,
    borderRadius: CONTENT_IN_RADIUS,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: CONTENT_PADDING / 2,
    paddingHorizontal: CONTENT_PADDING,
  },
  icon: {
    width: moderateScale(30),
    height: moderateScale(45),
    justifyContent: 'center',
  },
  text: {
    marginLeft: CONTENT_PADDING / 2,
  },
});
