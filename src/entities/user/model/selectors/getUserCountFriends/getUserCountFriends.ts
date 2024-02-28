import { RootState } from 'app/providers/StoreProvider';

export const getUserCountFriends = (state: RootState) =>
  state.user.friendIds?.length || 0;
