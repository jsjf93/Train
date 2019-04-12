using System.Collections.Generic;

namespace Train.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string WorkoutName { get; set; }
        public List<DurationExercise> DurationExercises { get; set; }
        public List<IntervalExercise> IntervalExercises { get; set; }
        public List<StrengthExercise> StrengthExercises { get; set; }
    }
}
