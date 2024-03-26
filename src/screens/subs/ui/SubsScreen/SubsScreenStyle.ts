import { StyleSheet } from 'react-native';
import {
  MAIN_HORIZONTAL,
  MAIN_VERTICAL,
  moderateScale,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    height: moderateScale(180),
    overflow: 'hidden',
  },
  iconBubble: {
    height: moderateScale(200),
  },
  iconPremium: {
    height: moderateScale(140),
    marginLeft: moderateScale(5),
  },
  premium: {
    position: 'absolute',
    bottom: 0,
  },
  premiumTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: MAIN_VERTICAL,
  },
  slider: {
    marginBottom: moderateScale(15),
  },
  content: {
    marginHorizontal: MAIN_HORIZONTAL,
    gap: moderateScale(20),
  },
  items: {
    position: 'relative',
    gap: moderateScale(10),
  },
  footer: {
    gap: moderateScale(20),
  },
  info: {
    textAlign: 'center',
  },
  buttons: {
    flex: 1,
    width: '100%',
  },
  links: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
