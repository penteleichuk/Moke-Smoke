import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, TITLE_MARGIN } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: MAIN_HORIZONTAL,
  },
  content: {
    marginBottom: TITLE_MARGIN * 5,
  },
});
