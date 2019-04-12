using System;

namespace Train.Models
{
    public class DurationExercise : IExercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public TimeSpan ExerciseDuration { get; set; }
    }
}
