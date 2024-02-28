import { RootState } from 'app/providers/StoreProvider';

export const getUserTaskById = (state: RootState, taskId: number) =>
  state.user.tasks[taskId];
