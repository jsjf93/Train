using System.Collections.Generic;
using Newtonsoft.Json;
using Train.Api.Models;

namespace Train.Api.Commands
{
  public class AddWorkoutCommand
  {
    [JsonProperty(PropertyName = "id")]
    public string Id { get; set; }
    [JsonProperty(PropertyName = "userId")]
    public string UserId { get; set; }
    public IEnumerable<Workout> Workouts { get; set; }
    public string PartitionKey => UserId;
  }
}
