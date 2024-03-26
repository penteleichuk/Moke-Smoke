import { StyleSheet } from 'react-native';
import {
  CONTENT_RADIUS,
  MAIN_VERTICAL,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(15),
    borderRadius: CONTENT_RADIUS,
    gap: moderateScale(5),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: MAIN_VERTICAL * 2,
    height: 'auto',
  },
  first: {
    width: '40%',
    alignItems: 'center',
  },
  second: {
    width: '30%',
    alignItems: 'flex-start',
  },
  third: {
    width: '30%',
    alignItems: 'flex-end',
  },
});
