import i18n from 'shared/config/i18n';
import * as Yup from 'yup';

export const usernameValidation = Yup.object().shape({
  name: Yup.string()
    .required(i18n.t('validation.required'))
    .min(1, i18n.t('validation.min', { min: 1 }))
    .max(90, i18n.t('validation.max', { max: 90 })),
});
