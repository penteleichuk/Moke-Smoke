import { resetUserSmoke } from 'entities/user';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useTheme } from 'shared/lib/theme';
import { LinkRow } from 'shared/ui/LinkRow';

export const СlearStatistics = memo(() => {
  const { cn } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onPressСlearStatistics = () => {
    Alert.alert(t('alert.clear.title'), t('alert.clear.description'), [
      { text: t('alert.clear.cancel') },
      {
        text: t('alert.clear.accept'),
        onPress: () => {
          dispatch(resetUserSmoke());
        },
      },
    ]);
  };

  return (
    <LinkRow
      Icon={Icons.Dotted}
      backgroundColorIcon={cn('sky.800')}
      colorIcon={cn('sky.300')}
      textColor={cn('white', 'black')}
      text={t('settings.auth.clear')}
      onPress={onPressСlearStatistics}
    />
  );
});
