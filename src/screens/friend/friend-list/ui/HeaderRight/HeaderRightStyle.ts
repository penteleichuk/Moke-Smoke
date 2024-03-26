import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
    flex: 0,
  },
  coin: {
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    padding: moderateScale(5),
  },
});
