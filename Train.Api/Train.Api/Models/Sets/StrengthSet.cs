using Newtonsoft.Json;

namespace Train.Api.Models.Sets
{
  public class StrengthSet : ExerciseSet
  {
    [JsonProperty("reps")]
    public int Reps { get; set; }

    [JsonProperty("weight")]
    public int Weight { get; set; }

    [JsonProperty("restDuration")]
    public Duration RestDuration { get; set; }
  }
}
