using System.Collections.Generic;
using Newtonsoft.Json;
using Train.Api.Commands;
using Train.Api.Models;

namespace Train.Api.Factories
{
  public class WorkoutFactory : IWorkoutFactory
  {
    public Workout Create(AddWorkoutCommand command)
    {
      var workoutExercises = JsonConvert.DeserializeObject<IEnumerable<WorkoutExercise>>(command.WorkoutExercises.ToString());
      var workout = new Workout
      {
        WorkoutName = command.WorkoutName,
        WorkoutExercises = workoutExercises
      };

      return workout;
    }
  }
}
