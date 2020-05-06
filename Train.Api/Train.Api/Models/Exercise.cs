using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Train.Api.Models
{
  public class Exercise
  {
    public int ExerciseId { get; set; }

    [Required]
    [MaxLength(256)]
    public string ExerciseName { get; set; }

    public ICollection<BodyPart> BodyPartsUsed { get; set; }
  }
}
