using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Train.Api.Commands;
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
    }

    public IEnumerable<Workout> GetWorkouts()
    {
      return this.context.Workouts
        .Include(p => p.WorkoutExercises)
        .ThenInclude(p => p.Sets)
        .ToList();
    }

    public Workout GetWorkout(int id)
    {
      return this.context.Workouts
        .Include(p => p.WorkoutExercises)
        .ThenInclude(p => p.Sets)
        .Single(p => p.Id == id);
    }

    public void UpdateWorkout(UpdateWorkoutCommand command)
    {
      var workout = this.context.Workouts
        .Where(p => p.Id == command.WorkoutId)
        .Include(p => p.WorkoutExercises)
        .ThenInclude(p => p.Sets)
        .SingleOrDefault();

      if (workout != null)
      {
        workout.WorkoutName = command.WorkoutName;
        workout.WorkoutExercises = command.WorkoutExercises;
        this.context.SaveChanges();
      }
    }

    public void DeleteWorkout(DeleteWorkoutCommand command)
    {
      var workout = this.context.Workouts
        .Include(p => p.WorkoutExercises)
        .ThenInclude(p => p.Sets)
        .Single(p => p.Id == command.Id);

      this.context.Remove(workout);
      this.context.SaveChanges();
    }

    public Exercise AddExercise(Exercise exercise)
    {
      this.context.Exercises.Add(exercise);
      this.context.SaveChanges();

      return exercise;
    }

    public void UpdateExercise(UpdateExerciseCommand command)
    {
      var exercise = this.context.Exercises
        .Include(e => e.BodyPartsUsed)
        .Single(e => e.ExerciseId == command.ExerciseId);

      if (exercise != null)
      {
        exercise.ExerciseName = command.ExerciseName;
        exercise.BodyPartsUsed = command.BodyParts;

        this.context.SaveChanges();
      }
    }

    public void DeleteExercise(DeleteExerciseCommand command)
    {
      var exercise = this.context.Exercises
        .Include(e => e.BodyPartsUsed)
        .Single(e => e.ExerciseId == command.Id);

      this.context.Exercises.Remove(exercise);
      this.context.SaveChanges();
    }

    public IEnumerable<Exercise> GetExercises()
    {
      return this.context.Exercises
        .Include(e => e.BodyPartsUsed)
        .ToList();
    }

    public Exercise GetExercise(int id)
    {
      return this.context.Exercises
        .Include(e => e.BodyPartsUsed)
        .Single(e => e.ExerciseId == id);
    }
  }
}
