import axios from 'axios';
import queryString from 'query-string';
import { SharedWorkoutInterface, SharedWorkoutGetQueryInterface } from 'interfaces/shared-workout';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSharedWorkouts = async (
  query?: SharedWorkoutGetQueryInterface,
): Promise<PaginatedInterface<SharedWorkoutInterface>> => {
  const response = await axios.get('/api/shared-workouts', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSharedWorkout = async (sharedWorkout: SharedWorkoutInterface) => {
  const response = await axios.post('/api/shared-workouts', sharedWorkout);
  return response.data;
};

export const updateSharedWorkoutById = async (id: string, sharedWorkout: SharedWorkoutInterface) => {
  const response = await axios.put(`/api/shared-workouts/${id}`, sharedWorkout);
  return response.data;
};

export const getSharedWorkoutById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shared-workouts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSharedWorkoutById = async (id: string) => {
  const response = await axios.delete(`/api/shared-workouts/${id}`);
  return response.data;
};
