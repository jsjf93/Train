using System.Net;
using Train.Api.Commands;
using Train.Api.Models;
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

    public Exercise Execute(UpdateExerciseCommand command)
    {
      return this.repository.UpdateExercise(command);
    }
  }
}
