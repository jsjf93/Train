using System.Collections.Generic;

namespace Train.Api.Models
{
  public class Workout
  {
    public int Id { get; set; }
    public string WorkoutName { get; set; }
    public IEnumerable<Exercise> Exercises { get; set; }
  }
}
