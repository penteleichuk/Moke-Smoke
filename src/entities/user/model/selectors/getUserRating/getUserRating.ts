import { RootState } from 'app/providers/StoreProvider';

export const getUserRating = (state: RootState) => state.user.rating;
