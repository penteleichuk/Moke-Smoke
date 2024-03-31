import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import {
  PERMISSIONS,
  PermissionStatus,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import { isIos } from 'shared/lib/isIos';

const platformeOS = isIos();

export const useCameraPermissions = () => {
  const { t } = useTranslation();

  const permission = async () => {
    const result = await check(
      platformeOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    );
    if (result === RESULTS.GRANTED) {
      return true;
    }

    switch (result) {
      case RESULTS.DENIED:
      case RESULTS.LIMITED: {
        request(
          platformeOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
        ).then((res: PermissionStatus) => {
          if (res !== 'granted') {
            return false;
          }
        });
        break;
      }
      default: {
        Alert.alert(
          t('alert.permission.camera.title'),
          t('alert.permission.camera.description'),
          [
            { text: t('alert.permission.camera.cancel') },
            {
              text: t('alert.permission.camera.accept'),
              onPress: () => {
                openSettings().catch(() =>
                  console.warn('cannot open settings'),
                );
              },
            },
          ],
        );
      }
    }
  };

  return { permission };
};
