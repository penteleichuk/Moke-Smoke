import i18n from 'shared/config/i18n';
import * as Yup from 'yup';

export const cigarettePrice = Yup.object().shape({
  price: Yup.number()
    .typeError(i18n.t('validation.required'))
    .required(i18n.t('validation.required'))
    .min(1, i18n.t('validation.min', { min: 1 }))
    .max(50000, i18n.t('validation.max', { max: 50000 })),
});
