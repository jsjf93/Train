using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Train.Api.CommandHandlers;
using Train.Api.Commands;

namespace Train.Api.Api
{
  public class AddExercise
  {
    private readonly IAddExerciseCommandHandler handler;

    public AddExercise(IAddExerciseCommandHandler handler)
    {
      this.handler = handler;
    }

    [FunctionName("AddExercise")]
    public async Task<HttpStatusCode> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      var command = JsonConvert.DeserializeObject<AddExerciseCommand>(requestBody);

      return this.handler.Execute(command);
    }
  }
}
