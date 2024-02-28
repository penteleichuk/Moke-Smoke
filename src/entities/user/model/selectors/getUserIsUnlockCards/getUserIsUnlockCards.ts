import { RootState } from 'app/providers/StoreProvider';

export const getUserIsUnlockCards = (state: RootState) => state.user.cards;
