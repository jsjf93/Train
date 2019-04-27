using System.Collections.Generic;

namespace Workouts.Api.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string WorkoutName { get; set; }
        public List<Exercise> Exercises { get; set; }
        //public List<WorkoutExercise> WorkoutExercises { get; set; }
    }
}
