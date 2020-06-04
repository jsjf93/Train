using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Train.Api.Repository;
using System.Net;
using Train.Api.Commands;

namespace Train.Api.Api
{
  public class DeleteWorkout
  {
    private readonly IDataRepository repository;

    public DeleteWorkout(IDataRepository repository)
    {
      this.repository = repository;
    }

    [FunctionName("DeleteWorkout")]
    public async Task<HttpStatusCode> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      var command = JsonConvert.DeserializeObject<DeleteWorkoutCommand>(requestBody);

      this.repository.DeleteWorkout(command);

      return HttpStatusCode.OK;
    }
  }
}
