import { RootState } from 'app/providers/StoreProvider';

export const getUserEmail = (state: RootState) => state.user.email;
