import * as yup from 'yup';

export const exerciseValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  duration: yup.number().integer().nullable(),
  calories_burned: yup.number().integer().nullable(),
});
