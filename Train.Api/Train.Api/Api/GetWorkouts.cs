using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Train.Api.Data;
using Train.Api.Models;
using Train.Api.Repository;

namespace Train.Api.Api
{
  public class GetWorkouts
  {
    private readonly IDataRepository repository;
    private readonly TrainContext context;

    public GetWorkouts(IDataRepository repository, TrainContext context)
    {
      this.repository = repository;
      this.context = context;
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
