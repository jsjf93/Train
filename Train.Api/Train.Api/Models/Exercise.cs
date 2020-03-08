using Train.Api.Models.Enums;

namespace Train.Api.Models
{
  public class Exercise
  {
    public int Id { get; set; }
    public string ExerciseName { get; set; }
    public ExerciseType ExerciseType { get; set; }
  }
}
