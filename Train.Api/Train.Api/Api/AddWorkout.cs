using System;
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
  public class AddWorkout
  {
    private readonly IAddWorkoutCommandHandler _handler;
    
    public AddWorkout(IAddWorkoutCommandHandler handler)
    {
      _handler = handler;
    }

    [FunctionName("AddWorkout")]
    public async Task<HttpStatusCode> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      var command = JsonConvert.DeserializeObject<AddWorkoutCommand>(requestBody);

      if (command?.UserId == null || command?.WorkoutExercises == null)
      {
        // todo: create argumentnullexception
        throw new Exception();
      }

      return _handler.Execute(command);
    }
  }
}
