const mapping: Record<string, string> = {
  exercises: 'exercise',
  'shared-workouts': 'shared_workout',
  teams: 'team',
  users: 'user',
  workouts: 'workout',
  'workout-exercises': 'workout_exercise',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
