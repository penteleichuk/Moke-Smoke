import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, MAIN_VERTICAL } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: MAIN_HORIZONTAL,
    paddingBottom: MAIN_VERTICAL,
  },
  content: {
    flex: 1,
  },
});
