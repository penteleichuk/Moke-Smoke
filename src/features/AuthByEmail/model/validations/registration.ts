import i18n from 'shared/config/i18n';
import * as Yup from 'yup';

export const registrationDto = Yup.object().shape({
  email: Yup.string()
    .required(i18n.t('validation.required'))
    .email(i18n.t('validation.email')),
  password: Yup.string()
    .required(i18n.t('validation.required'))
    .min(6, i18n.t('validation.min', { min: 6 }))
    .max(36, i18n.t('validation.max', { max: 36 })),
  repeatPassword: Yup.string()
    .required(i18n.t('validation.required'))
    .min(6, i18n.t('validation.min', { min: 6 }))
    .max(36, i18n.t('validation.max', { max: 36 }))
    .oneOf(
      [Yup.ref('password')],
      i18n.t('sheet.registration.showMessage.repeatPasswordEmpty'),
    ),
});
