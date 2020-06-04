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
  public class DeleteExercise
  {
    private readonly IDataRepository repository;

    public DeleteExercise(IDataRepository repository)
    {
      this.repository = repository;
    }

    [FunctionName("DeleteExercise")]
    public async Task<HttpStatusCode> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      var command = JsonConvert.DeserializeObject<DeleteExerciseCommand>(requestBody);

      this.repository.DeleteExercise(command);

      return HttpStatusCode.OK;
    }
  }
}
