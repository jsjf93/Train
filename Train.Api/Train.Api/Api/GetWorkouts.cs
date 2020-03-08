using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Train.Api.Queries;
using Train.Api.QueryHandlers;
using Train.Api.Results;

namespace Train.Api
{
  public class GetWorkouts
  {
    private readonly IGetWorkoutsQueryHandler _handler;

    public GetWorkouts(IGetWorkoutsQueryHandler handler)
    {
      _handler = handler;
    }

    [FunctionName(nameof(GetWorkouts))]
    public async Task<GetWorkoutsResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
      string userId = req.Query["userId"];
      var query = new GetWorkoutsQuery { UserId = userId };

      return await _handler.ExecuteAsync(query);
    }
  }
}
