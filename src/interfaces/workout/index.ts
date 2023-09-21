import { SharedWorkoutInterface } from 'interfaces/shared-workout';
import { WorkoutExerciseInterface } from 'interfaces/workout-exercise';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface WorkoutInterface {
  id?: string;
  name: string;
  description?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  shared_workout?: SharedWorkoutInterface[];
  workout_exercise?: WorkoutExerciseInterface[];
  user?: UserInterface;
  _count?: {
    shared_workout?: number;
    workout_exercise?: number;
  };
}

export interface WorkoutGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  user_id?: string;
}
