using System.Collections.Generic;
using Train.Api.Commands;
using Train.Api.Models;
using Train.Api.Queries;

namespace Train.Api.Repository
{
  public interface IDataRepository
  {
    void AddWorkout(Workout workout);

    IEnumerable<Workout> GetWorkouts();

    Workout GetWorkout(GetWorkoutQuery query);

    void DeleteWorkout(DeleteWorkoutCommand command);

    void UpdateWorkout(UpdateWorkoutCommand command);

    Exercise AddExercise(Exercise exercise);

    Exercise UpdateExercise(UpdateExerciseCommand command);

    void DeleteExercise(DeleteExerciseCommand command);

    Exercise GetExercise(int id);

    IEnumerable<Exercise> GetExercises();
  }
}
