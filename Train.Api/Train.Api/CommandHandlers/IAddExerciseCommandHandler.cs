using Train.Api.Commands;
using Train.Api.Models;

namespace Train.Api.CommandHandlers
{
  public interface IAddExerciseCommandHandler
  {
    Exercise Execute(AddExerciseCommand command);
  }
}
