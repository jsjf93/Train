using System.Collections.Generic;
using Train.Api.Models;

namespace Train.Api.Commands
{
  public class UpdateWorkoutCommand
  {
    public int WorkoutId { get; set; }
    public string WorkoutName { get; set; }
    public IEnumerable<WorkoutExercise> WorkoutExercises { get; set; }
  }
}
