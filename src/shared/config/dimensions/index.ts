import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { moderateScale } from 'react-native-size-matters';

export {
  scale as horizontalScale,
  moderateScale,
  verticalScale,
} from 'react-native-size-matters';

// UTILS
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('screen');
export const FLEX = { flex: 1 };
export const HAS_NOTCH = DeviceInfo.hasNotch();

// PADDING
export const CONTAINER_PADDING = moderateScale(30);
export const CONTENT_PADDING = moderateScale(10);

// MARGIN
export const TITLE_MARGIN = moderateScale(10);
export const MAIN_HORIZONTAL = moderateScale(20);
export const MAIN_VERTICAL = moderateScale(25);

// RADIUS
export const CONTENT_RADIUS = moderateScale(15);
export const CONTENT_IN_RADIUS = moderateScale(10);

// NAVIGATION
export const NAV_HEIGHT = moderateScale(HAS_NOTCH ? 80 : 70);
export const NAV_PADDING_VERTICAL = moderateScale(10);
export const NAV_PADDING_TOP = moderateScale(HAS_NOTCH ? 0 : 5);
export const NAV_PADDING_BOTTOM = moderateScale(HAS_NOTCH ? 30 : 8);
export const NAV_FONT_SIZE = moderateScale(11);
