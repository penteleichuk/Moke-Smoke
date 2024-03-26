import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import {
  NotificationsResponse,
  RESULTS,
  checkNotifications,
  openSettings,
  requestNotifications,
} from 'react-native-permissions';

export const usePermissionsNotifications = () => {
  const { t } = useTranslation();

  const permission = async () => {
    const result = await checkNotifications();
    if (result.status === RESULTS.GRANTED) {
      return true;
    }

    switch (result.status) {
      case RESULTS.DENIED:
      case RESULTS.LIMITED: {
        requestNotifications(['alert', 'sound']).then(
          (res: NotificationsResponse) => {
            if (res.status !== 'granted') {
              return false;
            }
          },
        );
        break;
      }
      default: {
        Alert.alert(
          t('alert.permission.notification.title'),
          t('alert.permission.notification.description'),
          [
            { text: t('alert.permission.notification.cancel') },
            {
              text: t('alert.permission.notification.accept'),
              onPress: () => {
                openSettings().catch(() =>
                  console.warn('cannot open settings'),
                );
              },
            },
          ],
        );
        return false;
      }
    }
  };

  return { permission };
};
