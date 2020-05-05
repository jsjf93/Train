using Newtonsoft.Json.Linq;

namespace Train.Api.DTOs
{
  public class CreateWorkoutDto
  {
    public string WorkoutName { get; set; }
    public JArray WorkoutExercises { get; set; }
  }
}
