using Newtonsoft.Json;

namespace Train.Api.Models.Sets
{
  public class DurationSet : ExerciseSet
  {
    [JsonProperty("duration")]
    public Duration Duration { get; set; }
  }
}
