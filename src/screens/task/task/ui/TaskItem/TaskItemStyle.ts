import { StyleSheet } from 'react-native';
import { CONTENT_PADDING, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    padding: CONTENT_PADDING + 5,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: moderateScale(10),
  },
  lock: {
    opacity: 0.4,
  },
  money: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(15),
  },
  progress: {
    alignSelf: 'center',
  },
});
