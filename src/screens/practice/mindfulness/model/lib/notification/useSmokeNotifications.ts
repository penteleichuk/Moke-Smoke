import { APP_NAME } from '@env';
import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useSmokeNotifications = () => {
  const { t } = useTranslation();

  const notification = useCallback(async () => {
    const date1 = new Date();
    date1.setMinutes(date1.getMinutes() + 60);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date1.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        id: 'MOTIVATION-1',
        title: t('notification.smoke.title', { value: APP_NAME }),
        body: t('notification.smoke.body'),
        android: {
          channelId: 'MOTIVATION-ID',
        },
      },
      trigger,
    );

    const date2 = new Date();
    date2.setHours(date2.getHours() + 24);

    // Create a time-based trigger
    const trigger2: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date2.getTime(),
      repeatFrequency: RepeatFrequency.WEEKLY,
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        id: 'MOTIVATION-2',
        title: t('notification.smoke.title', { value: APP_NAME }),
        body: t('notification.smoke.body'),
        android: {
          channelId: 'MOTIVATION-ID',
        },
      },
      trigger2,
    );
  }, []);

  return { notification };
};
