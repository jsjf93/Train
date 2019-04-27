using System.Collections.Generic;

namespace Workouts.Api.Models
{
    public interface IWorkout
    {
        int Id { get; set; }
        string WorkoutName { get; set; }
        List<Exercise> Exercises { get; set; }
    }
}
