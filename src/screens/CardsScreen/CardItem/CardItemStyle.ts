import { StyleSheet } from 'react-native';
import { CONTENT_RADIUS, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: CONTENT_RADIUS * 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: moderateScale(10),
  },
  text: {
    textAlign: 'center',
  },
});
