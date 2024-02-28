import { RootState } from 'app/providers/StoreProvider';

export const getUserListFriends = (state: RootState) => state.user.friendIds;
