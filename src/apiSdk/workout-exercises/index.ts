import axios from 'axios';
import queryString from 'query-string';
import { WorkoutExerciseInterface, WorkoutExerciseGetQueryInterface } from 'interfaces/workout-exercise';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getWorkoutExercises = async (
  query?: WorkoutExerciseGetQueryInterface,
): Promise<PaginatedInterface<WorkoutExerciseInterface>> => {
  const response = await axios.get('/api/workout-exercises', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createWorkoutExercise = async (workoutExercise: WorkoutExerciseInterface) => {
  const response = await axios.post('/api/workout-exercises', workoutExercise);
  return response.data;
};

export const updateWorkoutExerciseById = async (id: string, workoutExercise: WorkoutExerciseInterface) => {
  const response = await axios.put(`/api/workout-exercises/${id}`, workoutExercise);
  return response.data;
};

export const getWorkoutExerciseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/workout-exercises/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWorkoutExerciseById = async (id: string) => {
  const response = await axios.delete(`/api/workout-exercises/${id}`);
  return response.data;
};
