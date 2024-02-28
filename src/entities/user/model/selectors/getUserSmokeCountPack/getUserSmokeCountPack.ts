import { RootState } from 'app/providers/StoreProvider';

export const getUserSmokeCountPack = (state: RootState) =>
  state.user.smokePackCount;
