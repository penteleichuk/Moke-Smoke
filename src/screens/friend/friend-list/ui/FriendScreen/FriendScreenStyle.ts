import { StyleSheet } from 'react-native';
import {
  MAIN_HORIZONTAL,
  MAIN_VERTICAL,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MAIN_HORIZONTAL,
    marginVertical: MAIN_VERTICAL,
  },
  content: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    alignSelf: 'center',
    width: moderateScale(180),
    height: moderateScale(180),
  },
});
