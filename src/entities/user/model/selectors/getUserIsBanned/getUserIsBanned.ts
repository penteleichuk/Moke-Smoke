import { RootState } from 'app/providers/StoreProvider';

export const getUserIsBanned = (state: RootState) => state.user.banned;
