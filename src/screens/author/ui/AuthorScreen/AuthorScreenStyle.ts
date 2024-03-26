import { StyleSheet } from 'react-native';
import {
  CONTAINER_PADDING,
  CONTENT_PADDING,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: CONTAINER_PADDING,
  },
  avatar: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(150),
  },
  info: {
    marginVertical: CONTENT_PADDING,
  },
  name: {
    textAlign: 'center',
    marginBottom: CONTENT_PADDING / 2,
  },
  description: {
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
