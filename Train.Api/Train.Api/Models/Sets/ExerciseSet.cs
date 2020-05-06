using Train.Api.Models.Enums;

namespace Train.Api.Models.Sets
{
  public abstract class ExerciseSet
  {
    public int ExerciseSetId { get; set; }
    public ExerciseType ExerciseType { get; set; }

    public int WorkoutExerciseId { get; set; }
    public WorkoutExercise WorkoutExercise { get; set; }
  }
}
