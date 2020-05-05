using System.Collections.Generic;
using Newtonsoft.Json;

namespace Train.Api.Models
{
  public class Workout
  {
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("workoutName")]
    public string WorkoutName { get; set; }

    [JsonProperty("workoutExercises")]
    public IEnumerable<WorkoutExercise> WorkoutExercises { get; set; }
  }
}
