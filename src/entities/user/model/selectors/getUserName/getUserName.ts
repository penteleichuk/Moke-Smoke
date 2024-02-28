import { RootState } from 'app/providers/StoreProvider';

export const getUserName = (state: RootState) => state.user.name;
