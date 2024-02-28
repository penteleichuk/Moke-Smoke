import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  tailContainer: {
    position: 'absolute',
    bottom: -moderateScale(5),
  },
  tailContainerLeft: {
    left: -moderateScale(8),
  },
  tailContainerRight: {
    right: -moderateScale(8),
  },
});
