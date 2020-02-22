using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Train.Api.Commands;
using Train.Api.Helpers;
using Train.Api.Results;

namespace Train.Api.Api
{
  public static class AddWorkout
  {
    [FunctionName("AddWorkout")]
    public static async Task<HttpStatusCode> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      var data = JsonConvert.DeserializeObject<AddWorkoutCommand>(requestBody);

      if (data?.UserId == null || data?.Workouts == null)
      {
        // todo: create argumentnullexception
        throw new Exception();
      }

      var container = CosmosDbHelper.Client.GetContainer("Train", "Workouts");

      var result = await container.UpsertItemAsync(data, new PartitionKey(data.PartitionKey));

      return result.StatusCode;
    }
  }
}
