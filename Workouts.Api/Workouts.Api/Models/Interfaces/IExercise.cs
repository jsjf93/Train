using System;

namespace Workouts.Api.Models
{
    public interface IExercise
    {
        int Id { get; set; }
        string Name { get; set; }
        ExerciseType ExerciseType { get; set; }
        TimeSpan? ExerciseDuration { get; set; }
        TimeSpan? RestDuration { get; set; }
        int? Reps { get; set; }
        int? Sets { get; set; }
    }
}
