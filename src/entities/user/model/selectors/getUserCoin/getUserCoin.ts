import { RootState } from 'app/providers/StoreProvider';

export const getUserCoin = (state: RootState) => state.user.coin;
