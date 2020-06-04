using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Train.Api.Repository;

namespace Train.Api.Api
{
  public class GetWorkouts
  {
    private readonly IDataRepository repository;

    public GetWorkouts(IDataRepository repository)
    {
      this.repository = repository;
    }

    [FunctionName("GetWorkouts")]
    public IActionResult Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
      return new OkObjectResult(this.repository.GetWorkouts());
    }
  }
}
