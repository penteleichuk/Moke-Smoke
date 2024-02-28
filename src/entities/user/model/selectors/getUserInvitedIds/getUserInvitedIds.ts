import { RootState } from 'app/providers/StoreProvider';

export const getUserInvitedIds = (state: RootState) => state.user.invitedIds;
