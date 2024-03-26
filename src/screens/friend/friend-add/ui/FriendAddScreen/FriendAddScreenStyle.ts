import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: MAIN_HORIZONTAL,
  },
  loading: {
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});
