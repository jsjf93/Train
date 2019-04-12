using System;

namespace Train.Models
{
    public class IntervalExercise : IExercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public TimeSpan ExerciseDuration { get; set; }
        public TimeSpan RestDuration { get; set; }
        public int Sets { get; set; }
    }
}
