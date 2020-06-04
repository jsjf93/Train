using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Train.Api.Queries;
using Train.Api.Repository;

namespace Train.Api.Api
{
  public class GetWorkout
  {
    private readonly IDataRepository repository;

    public GetWorkout(IDataRepository repository)
    {
      this.repository = repository;
    }

    [FunctionName("GetWorkout")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      var command = JsonConvert.DeserializeObject<GetWorkoutQuery>(requestBody);

      return new OkObjectResult(this.repository.GetWorkout(command));
    }
  }
}
