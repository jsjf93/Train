using Train.Api.DTOs;

namespace Train.Api.Commands
{
  public class AddWorkoutCommand
  {
    public int UserId { get; set; }

    public CreateWorkoutDto WorkoutDto { get; set; }
  }
}
