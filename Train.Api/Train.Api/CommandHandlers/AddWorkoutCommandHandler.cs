using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Train.Api.Commands;
using Train.Api.Helpers;

namespace Train.Api.CommandHandlers
{
  public class AddWorkoutCommandHandler : IAddWorkoutCommandHandler
  {
    public async Task<HttpStatusCode> ExecuteAsync(AddWorkoutCommand command)
    {
      var container = CosmosDbHelper.Client.GetContainer("Train", "Workouts");

      var result = await container.UpsertItemAsync(command, new PartitionKey(command.PartitionKey));

      return result.StatusCode;
    }
  }
}
