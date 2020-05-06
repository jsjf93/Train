using System;
using System.Collections.Generic;
using Train.Api.Data;
using Train.Api.Models;

namespace Train.Api.Repository
{
  public class DataRepository : IDataRepository
  {
    private TrainContext context;

    public DataRepository(TrainContext context)
    {
      this.context = context;
    }

    public void AddWorkout(Workout workout)
    {
      this.context.Workouts.Add(workout);
      this.context.SaveChanges();

      var test = this.context.Workouts.Find(workout.Id);
    }

    public IEnumerable<Workout> GetWorkouts()
    {
      throw new NotImplementedException();
    }

    public void AddExercise(Exercise exercise)
    {
      this.context.Exercises.Add(exercise);
      this.context.SaveChanges();

      var test = this.context.Exercises.Find(exercise.ExerciseId);
    }
  }
}
