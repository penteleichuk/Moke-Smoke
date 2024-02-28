import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocalize } from 'shared/lib/utils/getLocalize';
import { LanguageList, LanguageType } from './model/types/localize';

import en from './../../assets/locales/en.json';
import it from './../../assets/locales/it.json';
import ro from './../../assets/locales/ro.json';
import ru from './../../assets/locales/ru.json';
import uk from './../../assets/locales/ua.json';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    try {
      const languageCode = getLocalize<LanguageType>();
      callback(languageCode);
    } catch (error) {
      console.error('Error detecting language:', error);
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: LanguageList.EN,
    resources: {
      en,
      ru,
      it,
      ro,
      uk,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
