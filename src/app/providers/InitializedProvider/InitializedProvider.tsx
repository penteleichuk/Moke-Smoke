import crashlytics from '@react-native-firebase/crashlytics';
import { authInitialized } from 'entities/auth';
import { inviteInitialaized } from 'entities/invited';
import { notificationInitialized } from 'entities/notification';
import {
  subscriptionInitialaized,
  subscriptionProfile,
} from 'entities/subscription';
import { FC, ReactNode, useEffect } from 'react';
import { getTrackingStatus } from 'react-native-tracking-transparency';
import { delay } from 'shared/lib/delay';
import { isIos } from 'shared/lib/isIos';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';

interface InitializedProviderProps {
  children: ReactNode;
}

const IS_IOS = isIos();

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

  useEffect(() => {
    (async () => {
      await delay(3000);

      if (IS_IOS) {
        const trackingStatus = await getTrackingStatus();
        if (
          trackingStatus === 'authorized' ||
          trackingStatus === 'unavailable'
        ) {
          await crashlytics().setCrashlyticsCollectionEnabled(true);
        }
      } else {
        await crashlytics().setCrashlyticsCollectionEnabled(true);
      }
    })();
  }, []);

  return children;
};
