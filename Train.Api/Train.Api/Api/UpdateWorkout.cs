using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net;
using Train.Api.Commands;
using Train.Api.Repository;

namespace Train.Api.Api
{
  public class UpdateWorkout
  {
    private readonly IDataRepository repository;

    public UpdateWorkout(IDataRepository repository)
    {
      this.repository = repository;
    }

    [FunctionName("UpdateWorkouts")]
    public async Task<HttpStatusCode> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      var command = JsonConvert.DeserializeObject<UpdateWorkoutCommand>(requestBody);

      this.repository.UpdateWorkout(command);

      return HttpStatusCode.OK;
    }
  }
}
