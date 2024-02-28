import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'shared/assets/icons';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { LinkSwitcher } from 'shared/ui/LinkSwitcher';
import { getVibrationIsEnabled } from './../model/selectors/getVibrationIsEnabled/getVibrationIsEnabled';
import { toggleVibration } from './../model/slices/vibrationSlice';

export const ToggleVibration = memo(() => {
  const isEnabledVibration = useAppSelector(getVibrationIsEnabled);

  const { cn } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const toggleVibrationHandler = useCallback(async () => {
    dispatch(toggleVibration());
  }, [isEnabledVibration]);

  return (
    <LinkSwitcher
      Icon={Icons.Alter}
      backgroundColorIcon={cn('teal.600')}
      colorIcon={cn('teal.200')}
      textColor={cn('white', 'black')}
      name={t('settings.switch.vibrator')}
      trackColorOn={cn('indigo.500')}
      trackColorOff={cn('indigo.300')}
      value={isEnabledVibration}
      onValueChange={toggleVibrationHandler}
    />
  );
});
