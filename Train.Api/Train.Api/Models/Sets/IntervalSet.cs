using Newtonsoft.Json;

namespace Train.Api.Models.Sets
{
  public class IntervalSet : ExerciseSet
  {
    [JsonProperty("weight")]
    public int Weight { get; set; }

    [JsonProperty("exerciseDuration")]
    public Duration ExerciseDuration { get; set; }

    [JsonProperty("restDuration")]
    public Duration RestDuration { get; set; }
  }
}
