using System.Net;
using Train.Api.Commands;

namespace Train.Api.CommandHandlers
{
  public interface IUpdateExerciseCommandHandler
  {
    HttpStatusCode Execute(UpdateExerciseCommand command);
  }
}
