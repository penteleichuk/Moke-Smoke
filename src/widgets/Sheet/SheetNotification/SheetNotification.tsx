import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { toggleNotification } from 'entities/notification';
import { usePermissionsNotifications } from 'features/ToggleNotification';
import Lottie from 'lottie-react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { Row } from 'shared/ui/Row';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetNotificationStyle';

export const SheetNotification = React.memo(() => {
  const { [AppSheet.NOTIFICATION]: notificationRef } =
    useContext(SheetCreateContext);

  const { permission } = usePermissionsNotifications();
  const dispatch = useAppDispatch();
  const { cn } = useTheme();
  const { t } = useTranslation();

  const onPressNotificationHandler = async () => {
    try {
      await permission();
      dispatch(toggleNotification());
    } catch (e) {}

    notificationRef?.current?.dismiss();
  };

  return (
    <Sheet name={AppSheet.NOTIFICATION} ref={notificationRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('settings.switch.notification')}
        </CustomText>
        <Lottie
          style={styles.animation}
          source={Anims.Notification}
          autoPlay
          loop
        />
        <CustomText
          size={TextSize.S_LG}
          style={[styles.description, { color: cn('white', 'black') }]}>
          {t('notifications.description')}
        </CustomText>
        <Row>
          <CustomButton
            onPress={onPressNotificationHandler}
            background={[cn('indigo.500'), cn('indigo.600')]}
            radius={10}>
            {t('notifications.btn')}
          </CustomButton>
        </Row>
      </View>
    </Sheet>
  );
});
