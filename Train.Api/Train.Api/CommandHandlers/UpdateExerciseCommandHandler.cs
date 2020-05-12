using System.Net;
using Train.Api.Commands;
using Train.Api.Repository;

namespace Train.Api.CommandHandlers
{
  public class UpdateExerciseCommandHandler : IUpdateExerciseCommandHandler
  {
    private readonly IDataRepository repository;

    public UpdateExerciseCommandHandler(IDataRepository repository)
    {
      this.repository = repository;
    }

    public HttpStatusCode Execute(UpdateExerciseCommand command)
    {
      this.repository.UpdateExercise(command);

      return HttpStatusCode.OK;
    }
  }
}
