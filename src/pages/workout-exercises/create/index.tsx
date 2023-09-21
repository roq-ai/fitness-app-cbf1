import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createWorkoutExercise } from 'apiSdk/workout-exercises';
import { workoutExerciseValidationSchema } from 'validationSchema/workout-exercises';
import { WorkoutInterface } from 'interfaces/workout';
import { ExerciseInterface } from 'interfaces/exercise';
import { getWorkouts } from 'apiSdk/workouts';
import { getExercises } from 'apiSdk/exercises';
import { WorkoutExerciseInterface } from 'interfaces/workout-exercise';

function WorkoutExerciseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WorkoutExerciseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWorkoutExercise(values);
      resetForm();
      router.push('/workout-exercises');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WorkoutExerciseInterface>({
    initialValues: {
      reps: 0,
      sets: 0,
      weight: 0,
      workout_id: (router.query.workout_id as string) ?? null,
      exercise_id: (router.query.exercise_id as string) ?? null,
    },
    validationSchema: workoutExerciseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Workout Exercises',
              link: '/workout-exercises',
            },
            {
              label: 'Create Workout Exercise',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Workout Exercise
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Reps"
            formControlProps={{
              id: 'reps',
              isInvalid: !!formik.errors?.reps,
            }}
            name="reps"
            error={formik.errors?.reps}
            value={formik.values?.reps}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('reps', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Sets"
            formControlProps={{
              id: 'sets',
              isInvalid: !!formik.errors?.sets,
            }}
            name="sets"
            error={formik.errors?.sets}
            value={formik.values?.sets}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('sets', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Weight"
            formControlProps={{
              id: 'weight',
              isInvalid: !!formik.errors?.weight,
            }}
            name="weight"
            error={formik.errors?.weight}
            value={formik.values?.weight}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('weight', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<WorkoutInterface>
            formik={formik}
            name={'workout_id'}
            label={'Select Workout'}
            placeholder={'Select Workout'}
            fetcher={getWorkouts}
            labelField={'name'}
          />
          <AsyncSelect<ExerciseInterface>
            formik={formik}
            name={'exercise_id'}
            label={'Select Exercise'}
            placeholder={'Select Exercise'}
            fetcher={getExercises}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/workout-exercises')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'workout_exercise',
    operation: AccessOperationEnum.CREATE,
  }),
)(WorkoutExerciseCreatePage);
