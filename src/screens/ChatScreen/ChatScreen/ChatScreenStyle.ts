import { StyleSheet } from 'react-native';
import { CONTENT_PADDING, MAIN_HORIZONTAL } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  continaer: {
    position: 'relative',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: MAIN_HORIZONTAL,
  },
  contentContainer: {
    paddingTop: CONTENT_PADDING,
  },
  info: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: CONTENT_PADDING,
  },
  text: {
    textAlign: 'center',
  },
});
