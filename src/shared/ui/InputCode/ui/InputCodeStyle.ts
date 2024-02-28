import { StyleSheet } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  codeFieldRoot: {
    justifyContent: 'space-between',
  },
  placeholder: {
    marginBottom: moderateScale(10),
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 40,
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: moderateScale(15),
  },
  error: {
    marginTop: moderateScale(10),
  },
});
