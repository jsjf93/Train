using System.Collections.Generic;

namespace Train.Api.Models
{
  public class Exercise
  {
    public int Id { get; set; }

    public string ExerciseName { get; set; }

    public IEnumerable<BodyPart> BodyPartsUsed { get; set; }
  }
}
