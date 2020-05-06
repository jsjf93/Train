using System.Net;
using Train.Api.Commands;
using Train.Api.Models;
using Train.Api.Repository;

namespace Train.Api.CommandHandlers
{
  public class AddExerciseCommandHandler : IAddExerciseCommandHandler
  {
    private readonly IDataRepository repository;

    public AddExerciseCommandHandler(IDataRepository repository)
    {
      this.repository = repository;
    }

    public HttpStatusCode Execute(AddExerciseCommand command)
    {
      var exercise = new Exercise() { ExerciseName = command.Name, BodyPartsUsed = command.BodyParts };

      this.repository.AddExercise(exercise);

      return HttpStatusCode.OK;
    }
  }
}
