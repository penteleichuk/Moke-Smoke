import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MAIN_HORIZONTAL,
  },
  title: {
    textAlign: 'center',
  },
  cards: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
});
