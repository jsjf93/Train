using System.ComponentModel.DataAnnotations;

namespace Train.Api.Models
{
  public class BodyPart
  {
    public int BodyPartId { get; set; }

    [Required]
    [MaxLength(256)]
    public string Name { get; set; }

    public int ExerciseId { get; set; }
  }
}
