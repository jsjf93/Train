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

    public Exercise Execute(AddExerciseCommand command)
    {
      var exercise = new Exercise() { ExerciseName = command.ExerciseName, BodyPartsUsed = command.BodyParts };

      return this.repository.AddExercise(exercise);
    }
  }
}
