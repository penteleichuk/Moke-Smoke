export { userBuyRating } from './model/services/userBuyRating/userBuyRating';
export { userRemove } from './model/services/userRemove/userRemove';
export { userSafeCleaning } from './model/services/userSafeCleaning/userSafeCleaning';
export { userUnlockCards } from './model/services/userUnlockCards/userUnlockCards';
export { userUnlockLearn } from './model/services/userUnlockLearn/userUnlockLearn';
export { userUnlockMotivation } from './model/services/userUnlockMotivation/userUnlockMotivation';

import { userActions } from './model/slice/userSlice';

export type { ChangePasswordDto } from './model/api/userApi';
export { getUserAvatarUrl } from './model/selectors/getUserAvatarUrl/getUserAvatarUrl';
export { getUserCoin } from './model/selectors/getUserCoin/getUserCoin';
export { getUserCountFriends } from './model/selectors/getUserCountFriends/getUserCountFriends';
export { getUserData } from './model/selectors/getUserData/getUserData';
export { getUserEmail } from './model/selectors/getUserEmail/getUserEmail';
export { getUserEmailIsActivate } from './model/selectors/getUserEmailIsActivate/getUserEmailIsActivate';
export { getUserId } from './model/selectors/getUserId/getUserId';
export { getUserInvitedIds } from './model/selectors/getUserInvitedIds/getUserInvitedIds';
export { getUserIsBanned } from './model/selectors/getUserIsBanned/getUserIsBanned';
export { getUserIsPremium } from './model/selectors/getUserIsPremium/getUserIsPremium';
export { getUserIsQuitting } from './model/selectors/getUserIsQuitting/getUserIsQuitting';
export { getUserIsUnlockCards } from './model/selectors/getUserIsUnlockCards/getUserIsUnlockCards';
export { getUserIsUnlockLearn } from './model/selectors/getUserIsUnlockLearn/getUserIsUnlockLearn';
export { getUserListFriends } from './model/selectors/getUserListFriends/getUserListFriends';
export { getUserMotivationUpdate } from './model/selectors/getUserMotivationUpdate/getUserMotivationUpdate';
export { getUserName } from './model/selectors/getUserName/getUserName';
export { getUserPricePack } from './model/selectors/getUserPricePack/getUserPricePack';
export { getUserRating } from './model/selectors/getUserRating/getUserRating';
export { getUserSmokeCountPack } from './model/selectors/getUserSmokeCountPack/getUserSmokeCountPack';
export { getUserSmokeEveryDay } from './model/selectors/getUserSmokeEveryDay/getUserSmokeEveryDay';
export { getUserTaskById } from './model/selectors/getUserTaskById/getUserTaskById';
export { getUserTaskLists } from './model/selectors/getUserTaskLists/getUserTaskLists';
export { getUserWeekly } from './model/selectors/getUserWeekly/getUserWeekly';
export { userReducer } from './model/slice/userSlice';

export const {
  setUserWeekly,
  initUserSmoke,
  resetUserSmoke,
  setUserName,
  setUserSmokePackCount,
  setUserSmokeEveryDay,
  setUserPricePack,
  addUserCoint,
  addUserRating,
  setUserEmailIsActivate,
  setUserQuitting,
  setUserTaskName,
  setUserTaskValue,
  setUserAvatar,
  removeUserAvatar,
  userLogout,
  userInitialized,
} = userActions;

export { UserApi } from './model/api/userApi';
export type { UserMotivationsType, UserTaskType } from './model/types/user';
