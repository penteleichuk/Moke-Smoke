import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 200,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    borderRadius: moderateScale(19),
    padding: moderateScale(30),
    backgroundColor: '#00000091',
  },
});
