import { RootState } from 'app/providers/StoreProvider';

export const getUserData = (state: RootState) => state.user;
