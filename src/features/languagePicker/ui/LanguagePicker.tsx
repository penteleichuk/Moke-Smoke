import { getLanguage, setLanguage } from 'entities/i18n';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'shared/assets/icons';
import { LanguageType } from 'shared/config/i18n';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { getLocalize } from 'shared/lib/utils/getLocalize';
import { LinkPicker } from 'shared/ui/LinkPicker';
import { languageValues } from '../model/const/value';
import { languageLabel } from '../model/lib/languageLabel';

export const LanguagePicker = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { cn } = useTheme();

  const language = useAppSelector(getLanguage);

  const onPressLanguagePicker = (value: string | number) => {
    if (value === 'system') {
      dispatch(setLanguage(getLocalize<LanguageType>()));
    } else {
      dispatch(setLanguage(value as LanguageType));
    }
  };

  return (
    <LinkPicker
      placeholder={t('settings.info.lang')}
      label={languageLabel(t('settings.info.sysLang'))}
      values={languageValues}
      Icon={Icons.Lang}
      backgroundColorIcon={cn('sky.600')}
      colorIcon={cn('sky.200')}
      textColor={cn('white', 'black')}
      value={language}
      variant={'string'}
      onSubmit={onPressLanguagePicker}
    />
  );
});
