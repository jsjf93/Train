using System;
using System.Collections.Generic;

namespace Workouts.Api.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ExerciseType ExerciseType { get; set; }
        public TimeSpan? ExerciseDuration { get; set; }
        public TimeSpan? RestDuration { get; set; }
        public int? Reps { get; set; }
        public int? Sets { get; set; }

        public Workout Workout;
        public int WorkoutId { get; set; }

        public override bool Equals(object obj)
        {
            if (obj == null || !obj.GetType().Equals(GetType()))
            {
                return false;
            }

            Exercise exercise = (Exercise)obj;

            return Name == exercise.Name &&
                ExerciseType == exercise.ExerciseType;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Name, ExerciseType);
        }
    }
}
