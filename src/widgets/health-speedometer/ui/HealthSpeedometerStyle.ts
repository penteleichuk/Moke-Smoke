import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '80%',
  },
  content: {
    position: 'absolute',
    bottom: moderateScale(50),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(5),
    borderRadius: 10,
  },
  text: {
    fontSize: moderateScale(10),
  },
});
