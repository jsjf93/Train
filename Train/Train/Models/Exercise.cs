using System;

namespace Train.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public ExerciseType ExerciseType { get; set; }

        public override bool Equals(Object obj)
        {
            if (obj == null || !obj.GetType().Equals(this.GetType())){
                return false;
            }

            Exercise exercise = (Exercise)obj;

            return Name == exercise.Name &&
                Notes == exercise.Notes &&
                ExerciseType == exercise.ExerciseType;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Name, Notes, ExerciseType);
        }
    }

    public enum ExerciseType { Duration, Interval, Strength}
}
