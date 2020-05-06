using System.Collections.Generic;
using Train.Api.Commands;
using Train.Api.Models;

namespace Train.Api.Repository
{
  public interface IDataRepository
  {
    void AddWorkout(Workout workout);

    IEnumerable<Workout> GetWorkouts();

    void AddExercise(Exercise exercise);
  }
}
