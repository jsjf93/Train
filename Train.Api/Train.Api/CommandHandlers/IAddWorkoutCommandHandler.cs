using System.Net;
using System.Threading.Tasks;
using Train.Api.Commands;

namespace Train.Api.CommandHandlers
{
    public interface IAddWorkoutCommandHandler
    {
        public HttpStatusCode Execute(AddWorkoutCommand command);
    }
}
