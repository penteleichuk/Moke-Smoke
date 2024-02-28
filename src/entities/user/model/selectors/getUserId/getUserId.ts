import { RootState } from 'app/providers/StoreProvider';

export const getUserId = (state: RootState) => state.user._id;
