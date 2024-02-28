import { APPLE_APP_ID, BACKEND_URL, GOOGLE_PACKAGE_NAME } from '@env';
import { AndroidMarket } from 'react-native-rate';

export const rateConfig = {
  AppleAppID: APPLE_APP_ID,
  GooglePackageName: GOOGLE_PACKAGE_NAME,
  preferredAndroidMarket: AndroidMarket.Google,
  preferInApp: false,
  openAppStoreIfInAppFails: true,
  fallbackPlatformURL: BACKEND_URL,
};
