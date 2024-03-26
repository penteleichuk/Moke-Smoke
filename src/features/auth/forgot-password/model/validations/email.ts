import i18n from 'shared/config/i18n';
import * as Yup from 'yup';

export const emailForgotDto = Yup.object().shape({
  email: Yup.string()
    .required(i18n.t('validation.required'))
    .email(i18n.t('validation.email')),
});
