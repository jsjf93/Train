using Newtonsoft.Json;

namespace Train.Api.Models.Sets
{
  public abstract class ExerciseSet
  {
    [JsonProperty("id")]
    public int Id { get; set; }

    public int WorkoutExerciseId { get; set; }
    public WorkoutExercise WorkoutExercise { get; set; }
  }
}
