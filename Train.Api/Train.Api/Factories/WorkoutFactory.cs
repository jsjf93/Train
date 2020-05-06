using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Train.Api.DTOs;
using Train.Api.Models;
using Train.Api.Models.Enums;
using Train.Api.Models.Sets;

namespace Train.Api.Factories
{
  public class WorkoutFactory : IWorkoutFactory
  {
    public Workout Create(CreateWorkoutDto workoutDto)
    {
      var exercises = new List<WorkoutExercise>();
      var workout = new Workout
      {
        WorkoutName = workoutDto.WorkoutName
      };

      foreach (var token in workoutDto.WorkoutExercises)
      {
        var exerciseType = token.Value<int>("exerciseType");

        switch (exerciseType)
        {
          case (int)ExerciseType.Strength:
            exercises.Add(GetStrengthWorkoutExercise(token));
            break;
          default:
            throw new Exception($"ExerciseType {exerciseType} not implemented");
        }
      }

      workout.WorkoutExercises = exercises;
      return workout;
    }

    private WorkoutExercise GetStrengthWorkoutExercise(JToken token)
    {
      var exercise = new WorkoutExercise();
      exercise.ExerciseName = token.Value<string>("exerciseName");
      exercise.ExerciseType = ExerciseType.Strength;
      var jArray = token.Value<JArray>("sets");
      var sets = new List<ExerciseSet>();

      foreach (var item in jArray)
      {
        var set = new StrengthSet();
        set.ExerciseSetId = item.Value<int>("id");
        set.Reps = item.Value<int>("reps");
        set.Weight = item.Value<int>("weight");
        var test = item.Value<JObject>("restDuration");
        set.RestDuration = test.ToObject<Duration>();

        sets.Add(set);
      }

      exercise.Sets = sets;

      return exercise;
    }
  }
}
