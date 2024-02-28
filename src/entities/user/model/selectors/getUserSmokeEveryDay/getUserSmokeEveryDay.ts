import { RootState } from 'app/providers/StoreProvider';

export const getUserSmokeEveryDay = (state: RootState) =>
  state.user.smokeEveryDay;
