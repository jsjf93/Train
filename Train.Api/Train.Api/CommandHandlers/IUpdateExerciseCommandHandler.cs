using System.Net;
using Train.Api.Commands;
using Train.Api.Models;

namespace Train.Api.CommandHandlers
{
  public interface IUpdateExerciseCommandHandler
  {
    Exercise Execute(UpdateExerciseCommand command);
  }
}
