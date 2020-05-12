using System.Collections.Generic;
using Train.Api.Models;

namespace Train.Api.Commands
{
  public class UpdateExerciseCommand
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<BodyPart> BodyParts { get; set; }
  }
}
