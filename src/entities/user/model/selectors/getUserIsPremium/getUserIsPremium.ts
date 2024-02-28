import { RootState } from 'app/providers/StoreProvider';

export const getUserIsPremium = (state: RootState) => state.user.premium;
