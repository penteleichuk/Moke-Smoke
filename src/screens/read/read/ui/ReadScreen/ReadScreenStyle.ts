import { StyleSheet } from 'react-native';
import {
  MAIN_HORIZONTAL,
  TITLE_MARGIN,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: MAIN_HORIZONTAL,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: TITLE_MARGIN,
  },
  animation: {
    width: '35%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    marginBottom: moderateScale(10),
  },
});
