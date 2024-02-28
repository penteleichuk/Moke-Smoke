import { RootState } from 'app/providers/StoreProvider';

export const getUserEmailIsActivate = (state: RootState) =>
  state.user.emailActivate;
