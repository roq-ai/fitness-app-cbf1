import { WorkoutExerciseInterface } from 'interfaces/workout-exercise';
import { GetQueryInterface } from 'interfaces';

export interface ExerciseInterface {
  id?: string;
  name: string;
  description?: string;
  duration?: number;
  calories_burned?: number;
  created_at?: any;
  updated_at?: any;
  workout_exercise?: WorkoutExerciseInterface[];

  _count?: {
    workout_exercise?: number;
  };
}

export interface ExerciseGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
}
