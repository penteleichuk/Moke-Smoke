import { RootState } from 'app/providers/StoreProvider';

export const getUserPricePack = (state: RootState) =>
  state.user.pricePackSmoking;
