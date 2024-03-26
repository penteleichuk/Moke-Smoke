import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

const CONT_SIZE = moderateScale(25);

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: CONT_SIZE,
  },
});
