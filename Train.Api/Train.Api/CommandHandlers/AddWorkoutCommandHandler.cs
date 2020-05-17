using System.Net;
using Train.Api.Commands;
using Train.Api.Factories;
using Train.Api.Repository;

namespace Train.Api.CommandHandlers
{
    public class AddWorkoutCommandHandler : IAddWorkoutCommandHandler
  {
    private readonly IDataRepository repository;
    private readonly IWorkoutFactory factory;

    public AddWorkoutCommandHandler(IDataRepository repository, IWorkoutFactory factory)
    {
      this.repository = repository;
      this.factory = factory;
    }

    public HttpStatusCode Execute(AddWorkoutCommand command)
    {
      var workout = this.factory.Create(command);

      this.repository.AddWorkout(workout);

      return HttpStatusCode.OK;
    }
  }
}
