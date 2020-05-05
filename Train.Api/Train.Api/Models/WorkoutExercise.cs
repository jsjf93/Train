using System.Collections.Generic;
using Newtonsoft.Json;
using Train.Api.Models.Enums;
using Train.Api.Models.Sets;

namespace Train.Api.Models
{
  public class WorkoutExercise
  {
    [JsonProperty("workoutExerciseId")]
    public int WorkoutExerciseId { get; set; }

    [JsonProperty("exerciseName")]
    public string ExerciseName { get; set; }

    [JsonProperty("exerciseType")]
    public ExerciseType ExerciseType { get; set; }

    [JsonProperty("sets")]
    public List<ExerciseSet> Sets { get; set; }

    public int WorkoutId { get; set; }
    public Workout Workout { get; set; }
  }
}
