import { RootState } from 'app/providers/StoreProvider';

export const getUserWeekly = (state: RootState) => state.user.weekly;
