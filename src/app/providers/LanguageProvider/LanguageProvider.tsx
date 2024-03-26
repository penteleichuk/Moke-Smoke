import { getLanguage } from 'features/language-picker';
import moment from 'moment';
import { FC, ReactNode, useEffect } from 'react';
import Tts from 'react-native-tts';
import i18n, { languageVoice } from 'shared/config/i18n';
import { useAppSelector } from 'shared/hooks/useAppSelector';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const language = useAppSelector(getLanguage);

  useEffect(() => {
    Tts.setIgnoreSilentSwitch('ignore' as unknown as boolean);
  }, []);

  useEffect(() => {
    if (language) {
      moment.locale(language);

      i18n.changeLanguage(language);

      if (languageVoice.hasOwnProperty(language)) {
        Tts.setDefaultLanguage(languageVoice[language]);
      } else {
        Tts.setDefaultLanguage(languageVoice.en);
      }
    }
  }, [language]);

  return children;
};
