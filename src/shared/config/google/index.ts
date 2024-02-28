import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';

export const googleSigninConfig = {
  scopes: ['https://www.googleapis.com/auth/userinfo.email'],
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
  iosClientId: IOS_CLIENT_ID,
};
