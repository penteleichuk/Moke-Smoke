export enum LanguageList {
  EN = 'en',
  UK = 'uk',
  RO = 'ro',
  IT = 'it',
  RU = 'ru',
}

export type LanguageType = Lowercase<keyof typeof LanguageList>;
