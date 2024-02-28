import { StyleSheet } from 'react-native';
import {
  CONTENT_IN_RADIUS,
  TITLE_MARGIN,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: CONTENT_IN_RADIUS,
    padding: moderateScale(7),
    alignItems: 'center',
    borderWidth: 1,
  },
  shadow: {
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    marginTop: TITLE_MARGIN,
  },
});
