import * as Yup from 'yup';

export const codeDto = Yup.object().shape({
  code: Yup.string()
    .required('Code is required')
    .min(6, 'Invalid code')
    .max(6, 'Invalid code'),
});
