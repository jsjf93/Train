namespace Train.Api.Models.Sets
{
  public class Duration
  {
    public int DurationId { get; set; }
    public int Minutes { get; set; }
    public int Seconds { get; set; }

    public int ExerciseSetId { get; set; }
  }
}
