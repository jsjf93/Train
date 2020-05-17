using System.Collections.Generic;
using Train.Api.Models;

namespace Train.Api.Commands
{
  public class UpdateExerciseCommand
  {
    public int ExerciseId { get; set; }
    public string ExerciseName { get; set; }
    public ICollection<BodyPart> BodyParts { get; set; }
  }
}
