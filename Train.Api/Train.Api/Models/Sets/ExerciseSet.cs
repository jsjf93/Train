using Newtonsoft.Json;
using Train.Api.Converters;
using Train.Api.Models.Enums;

namespace Train.Api.Models.Sets
{
  [JsonConverter(typeof(ExerciseSetConverter))]
  public abstract class ExerciseSet
  {
    public int ExerciseSetId { get; set; }
    public ExerciseType ExerciseType { get; set; }

    public int WorkoutExerciseId { get; set; }
    public WorkoutExercise WorkoutExercise { get; set; }
  }
}
