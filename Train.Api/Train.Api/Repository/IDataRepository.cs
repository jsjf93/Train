using System.Collections.Generic;
using Train.Api.Commands;
using Train.Api.Models;

namespace Train.Api.Repository
{
  public interface IDataRepository
  {
    void AddWorkout(Workout workout);

    IEnumerable<Workout> GetWorkouts();

    Workout GetWorkout(int id);

    void RemoveWorkout(int id);

    void UpdateWorkout(UpdateWorkoutCommand command);

    void AddExercise(Exercise exercise);

    void UpdateExercise(UpdateExerciseCommand command);

    void RemoveExercise(int id);

    Exercise GetExercise(int id);

    IEnumerable<Exercise> GetExercises();
  }
}
