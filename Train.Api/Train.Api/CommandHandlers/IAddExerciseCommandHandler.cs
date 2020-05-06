using System.Net;
using Train.Api.Commands;

namespace Train.Api.CommandHandlers
{
    public interface IAddExerciseCommandHandler
    {
        HttpStatusCode Execute(AddExerciseCommand command);
    }
}
