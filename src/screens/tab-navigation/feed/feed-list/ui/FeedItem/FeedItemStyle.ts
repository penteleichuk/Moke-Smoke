import { StyleSheet } from 'react-native';
import {
  CONTENT_RADIUS,
  MAIN_HORIZONTAL,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    paddingLeft: MAIN_HORIZONTAL,
    marginTop: MAIN_HORIZONTAL,
    marginHorizontal: MAIN_HORIZONTAL,
  },
  avatar: {
    position: 'absolute',
    top: moderateScale(15),
    marginRight: moderateScale(10),
    zIndex: 50,
  },
  rating: {
    position: 'absolute',
    top: moderateScale(70),
    left: moderateScale(8),
    zIndex: 50,
  },
  ratingPosition: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingValue: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    minHeight: moderateScale(120),
    borderRadius: CONTENT_RADIUS,
    padding: moderateScale(20),
    paddingLeft: moderateScale(30),
  },
  section: {
    flex: 1,
    gap: moderateScale(7),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  die: {
    paddingHorizontal: moderateScale(6),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(5),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
  },
  panel: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(10),
    gap: moderateScale(5),
  },
});
