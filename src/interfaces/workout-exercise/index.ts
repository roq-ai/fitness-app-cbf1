import { WorkoutInterface } from 'interfaces/workout';
import { ExerciseInterface } from 'interfaces/exercise';
import { GetQueryInterface } from 'interfaces';

export interface WorkoutExerciseInterface {
  id?: string;
  workout_id: string;
  exercise_id: string;
  reps?: number;
  sets?: number;
  weight?: number;
  created_at?: any;
  updated_at?: any;

  workout?: WorkoutInterface;
  exercise?: ExerciseInterface;
  _count?: {};
}

export interface WorkoutExerciseGetQueryInterface extends GetQueryInterface {
  id?: string;
  workout_id?: string;
  exercise_id?: string;
}
