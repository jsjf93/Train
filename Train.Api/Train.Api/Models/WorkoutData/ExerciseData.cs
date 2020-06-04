using System.Collections.Generic;
using Train.Api.Models.Sets;

namespace Train.Api.Models
{
  public class ExerciseData<T> where T : ExerciseSet
  {
    public int Id { get; set; }
    public IEnumerable<T> Sets { get; set; }

    public int WorkoutExerciseId { get; set; }
    public WorkoutExercise WorkoutExercise { get; set; }
  }
}
