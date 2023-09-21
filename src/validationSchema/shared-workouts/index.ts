import * as yup from 'yup';

export const sharedWorkoutValidationSchema = yup.object().shape({
  workout_id: yup.string().nullable().required(),
  shared_with: yup.string().nullable().required(),
  shared_by: yup.string().nullable().required(),
});
