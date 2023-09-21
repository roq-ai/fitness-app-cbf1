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

import { createSharedWorkout } from 'apiSdk/shared-workouts';
import { sharedWorkoutValidationSchema } from 'validationSchema/shared-workouts';
import { WorkoutInterface } from 'interfaces/workout';
import { UserInterface } from 'interfaces/user';
import { getWorkouts } from 'apiSdk/workouts';
import { getUsers } from 'apiSdk/users';
import { SharedWorkoutInterface } from 'interfaces/shared-workout';

function SharedWorkoutCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SharedWorkoutInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSharedWorkout(values);
      resetForm();
      router.push('/shared-workouts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SharedWorkoutInterface>({
    initialValues: {
      workout_id: (router.query.workout_id as string) ?? null,
      shared_with: (router.query.shared_with as string) ?? null,
      shared_by: (router.query.shared_by as string) ?? null,
    },
    validationSchema: sharedWorkoutValidationSchema,
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
              label: 'Shared Workouts',
              link: '/shared-workouts',
            },
            {
              label: 'Create Shared Workout',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Shared Workout
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<WorkoutInterface>
            formik={formik}
            name={'workout_id'}
            label={'Select Workout'}
            placeholder={'Select Workout'}
            fetcher={getWorkouts}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'shared_with'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'shared_by'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
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
              onClick={() => router.push('/shared-workouts')}
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
    entity: 'shared_workout',
    operation: AccessOperationEnum.CREATE,
  }),
)(SharedWorkoutCreatePage);
