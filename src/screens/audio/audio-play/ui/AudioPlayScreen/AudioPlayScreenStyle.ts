import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tags: {
    flex: 1,
    margin: MAIN_HORIZONTAL,
  },
  content: {
    width: '100%',
    padding: MAIN_HORIZONTAL,
    position: 'relative',
  },
  player: {
    gap: moderateScale(20),
  },
});
