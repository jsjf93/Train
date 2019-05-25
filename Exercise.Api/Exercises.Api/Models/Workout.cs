using System.Collections.Generic;

namespace Train.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string WorkoutName { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}
