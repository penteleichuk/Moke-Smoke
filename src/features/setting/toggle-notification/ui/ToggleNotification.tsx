import {
  getNotificationIsEnabled,
  toggleNotification,
} from 'entities/notification';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'shared/assets/icons';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { LinkSwitcher } from 'shared/ui/LinkSwitcher';
import { usePermissionsNotifications } from './../model/lib/hooks/usePermissionsNotifications';

export const ToggleNotification = memo(() => {
  const isNotification = useAppSelector(getNotificationIsEnabled) || false;

  const dispatch = useAppDispatch();
  const { permission } = usePermissionsNotifications();
  const { cn } = useTheme();
  const { t } = useTranslation();

  const setIsNotificationHandler = useCallback(async () => {
    if (!isNotification) {
      if (!(await permission())) {
        return;
      }
    }

    dispatch(toggleNotification());
  }, [isNotification]);

  return (
    <LinkSwitcher
      Icon={Icons.Alter}
      backgroundColorIcon={cn('purple.600')}
      colorIcon={cn('purple.200')}
      textColor={cn('white', 'black')}
      name={t('settings.switch.notification')}
      trackColorOn={cn('indigo.500')}
      trackColorOff={cn('indigo.300')}
      value={isNotification}
      onValueChange={setIsNotificationHandler}
    />
  );
});
