import { userRemove } from 'entities/user';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useTheme } from 'shared/lib/theme';
import { LinkRow } from 'shared/ui/LinkRow';

export const RemoveAccount = memo(() => {
  const { cn } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onPressRemoveAccount = () => {
    Alert.alert(t('alert.remove.title'), t('alert.remove.description'), [
      { text: t('alert.remove.cancel') },
      {
        text: t('alert.remove.accept'),
        onPress: () => {
          Alert.alert(t('alert.remove.title'), t('alert.remove.description'), [
            { text: t('alert.remove.cancel') },
            {
              text: t('alert.remove.accept'),
              onPress: () => {
                dispatch(userRemove());
              },
            },
          ]);
        },
      },
    ]);
  };

  return (
    <LinkRow
      Icon={Icons.Attention}
      backgroundColorIcon={cn('rose.600')}
      colorIcon={cn('rose.200')}
      textColor={cn('white', 'black')}
      text={t('settings.info.remove')}
      onPress={onPressRemoveAccount}
    />
  );
});
