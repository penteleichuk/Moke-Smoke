import { StyleSheet } from 'react-native';
import {
  CONTENT_PADDING,
  CONTENT_RADIUS,
  TITLE_MARGIN,
  moderateScale,
} from 'shared/config/dimensions';

const ICON_SIZE = moderateScale(30);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: CONTENT_PADDING,
    borderRadius: CONTENT_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: TITLE_MARGIN,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  button: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
