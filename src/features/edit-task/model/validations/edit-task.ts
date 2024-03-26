import i18n from 'shared/config/i18n';
import * as Yup from 'yup';

export const editTaskDto = Yup.object().shape({
  name: Yup.string().max(90, i18n.t('validation.max', { max: 90 })),
  value: Yup.number()
    .typeError(i18n.t('validation.required'))
    .max(5000000000, i18n.t('validation.max', { max: 5000000000 })),
});
