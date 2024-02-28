import { StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL, moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: MAIN_HORIZONTAL,
  },
  placeholder: {
    textAlign: 'center',
  },
  picker: {
    paddingVertical: moderateScale(15),
  },
  line: {
    paddingLeft: moderateScale(10),
    borderRadius: moderateScale(10),
  },
});
