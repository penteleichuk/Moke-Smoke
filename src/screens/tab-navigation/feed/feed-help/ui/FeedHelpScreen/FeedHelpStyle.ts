import { StyleSheet } from 'react-native';
import { CONTAINER_PADDING, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: CONTAINER_PADDING,
  },
  anims: {
    height: '20%',
    marginBottom: moderateScale(20),
  },
  content: { paddingBottom: moderateScale(180) },
  data: {
    gap: moderateScale(20),
  },
});
