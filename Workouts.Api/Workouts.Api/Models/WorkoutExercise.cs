namespace Workouts.Api.Models
{
    public class WorkoutExercise
    {
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }
        public int WorkoutId { get; set; }
        public Workout Workout { get; set; }
    }
}
