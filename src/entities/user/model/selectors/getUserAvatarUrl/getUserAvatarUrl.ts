import { RootState } from 'app/providers/StoreProvider';

export const getUserAvatarUrl = (state: RootState) => state.user.avatarUrl;
