using Newtonsoft.Json.Linq;

namespace Train.Api.Commands
{
  public class AddWorkoutCommand
  {
    public int UserId { get; set; }
    public string WorkoutName { get; set; }
    public JArray WorkoutExercises { get; set; }
  }
}
