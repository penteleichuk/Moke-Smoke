import { RootState } from 'app/providers/StoreProvider';

export const getUserIsQuitting = (state: RootState) => state.user.toBegin;
