import { RootState } from 'app/providers/StoreProvider';

export const getUserMotivationUpdate = (state: RootState) =>
  state.user.motivationUpdatedAt;
