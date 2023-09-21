import { WorkoutInterface } from 'interfaces/workout';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SharedWorkoutInterface {
  id?: string;
  workout_id: string;
  shared_with: string;
  shared_by: string;
  created_at?: any;
  updated_at?: any;

  workout?: WorkoutInterface;
  user_shared_workout_shared_withTouser?: UserInterface;
  user_shared_workout_shared_byTouser?: UserInterface;
  _count?: {};
}

export interface SharedWorkoutGetQueryInterface extends GetQueryInterface {
  id?: string;
  workout_id?: string;
  shared_with?: string;
  shared_by?: string;
}
