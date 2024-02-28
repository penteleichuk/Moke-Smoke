import { LanguageList } from './../types/localize';

type LanguageVoiceType = {
  [key in keyof typeof LanguageList as Lowercase<
    keyof typeof LanguageList
  >]: string;
};

export const languageVoice: LanguageVoiceType = {
  en: 'en-US',
  uk: 'uk-UA',
  ro: 'ro-RO',
  it: 'it-IT',
  ru: 'ru-RU',
};
