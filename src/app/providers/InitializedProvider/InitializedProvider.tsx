import { authInitialized } from 'entities/auth';
import { inviteInitialaized } from 'entities/invited';
import { notificationInitialized } from 'entities/notification';
import {
  subscriptionInitialaized,
  subscriptionProfile,
} from 'entities/subscription';
import { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface InitializedProviderProps {
  children: ReactNode;
}

export const InitializedProvider: FC<InitializedProviderProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialized = async () => {
      await Promise.all([
        dispatch(authInitialized()),
        dispatch(inviteInitialaized()),
        dispatch(notificationInitialized()),
        dispatch(subscriptionInitialaized()),
        dispatch(subscriptionProfile()),
      ]);
    };
    initialized();
  }, []);

  return children;
};
