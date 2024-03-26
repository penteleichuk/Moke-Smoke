import { StyleSheet } from 'react-native';
import { CONTENT_PADDING, TITLE_MARGIN } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: TITLE_MARGIN,
  },
  link: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    gap: CONTENT_PADDING,
  },
  row: {
    flexDirection: 'row',
  },
});
