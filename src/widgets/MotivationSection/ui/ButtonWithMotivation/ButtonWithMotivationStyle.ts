import { StyleSheet } from 'react-native';
import {
  CONTENT_IN_RADIUS,
  CONTENT_PADDING,
  TITLE_MARGIN,
  moderateScale,
} from 'shared/config/dimensions';

const ICON_SIZE = moderateScale(40);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: CONTENT_PADDING,
    borderRadius: CONTENT_IN_RADIUS,
    borderWidth: 1,
  },
  information: {
    justifyContent: 'center',
  },
  name: {
    marginTop: TITLE_MARGIN,
  },
  arrow: {
    flexDirection: 'row',
  },
  image: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
