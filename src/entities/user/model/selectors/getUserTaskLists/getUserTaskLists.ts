import { RootState } from 'app/providers/StoreProvider';

export const getUserTaskLists = (state: RootState) => state.user.tasks;
