using Train.Api.Commands;
using Train.Api.Models;

namespace Train.Api.Factories
{
  public interface IWorkoutFactory
  {
    Workout Create(AddWorkoutCommand command);
  }
}
