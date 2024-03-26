import i18n from 'shared/config/i18n';
import * as Yup from 'yup';

export const changePasswordForgotDto = Yup.object().shape({
  password: Yup.string()
    .typeError(i18n.t('validation.required'))
    .required(i18n.t('validation.required'))
    .min(6, i18n.t('validation.min', { min: 6 }))
    .max(36, i18n.t('validation.max', { max: 36 })),
  repeatPassword: Yup.string()
    .typeError(i18n.t('validation.required'))
    .required(i18n.t('validation.required'))
    .min(6, i18n.t('validation.min', { min: 6 }))
    .max(36, i18n.t('validation.max', { max: 36 }))
    .oneOf(
      [Yup.ref('password'), null],
      i18n.t('sheet.registration.showMessage.repeatPasswordEmpty'),
    ),
});
