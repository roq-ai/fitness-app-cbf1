import * as yup from 'yup';

export const workoutExerciseValidationSchema = yup.object().shape({
  reps: yup.number().integer().nullable(),
  sets: yup.number().integer().nullable(),
  weight: yup.number().integer().nullable(),
  workout_id: yup.string().nullable().required(),
  exercise_id: yup.string().nullable().required(),
});
