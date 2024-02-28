import { StyleSheet } from 'react-native';
import { CONTENT_PADDING } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  contentContainerStyle: {
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingHorizontal: CONTENT_PADDING * 2,
    paddingVertical: CONTENT_PADDING,
  },
});
