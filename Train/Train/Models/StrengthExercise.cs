using System;

namespace Train.Models
{
    public class StrengthExercise : IExercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public TimeSpan RestDuration { get; set; }
    }
}
