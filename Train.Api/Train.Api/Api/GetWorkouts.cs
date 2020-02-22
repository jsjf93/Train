using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Train.Api.Helpers;
using Train.Api.Results;

namespace Train.Api
{
  public static class GetWorkouts
  {
    [FunctionName(nameof(GetWorkouts))]
    public static async Task<GetWorkoutsResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      string userId = req.Query["userId"];

      var container = CosmosDbHelper.Client.GetContainer("Train", "Workouts");

      var sql = $"SELECT c.workouts FROM c where c.userId = '{userId}'";

      var iterator = container.GetItemQueryIterator<GetWorkoutsResult>(sql);
      var documents = await iterator.ReadNextAsync();

      var list = documents.FirstOrDefault();

      return list;
    }
  }
}
