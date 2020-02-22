using System.Collections.Generic;
using Train.Api.Models;

namespace Train.Api.Results
{
  public class GetWorkoutsResult
  {
    public IEnumerable<Workout> Workouts { get; set; }
  }
}
