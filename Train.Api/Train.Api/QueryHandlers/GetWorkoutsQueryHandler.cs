using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Train.Api.Helpers;
using Train.Api.Models;
using Train.Api.Queries;
using Train.Api.Results;

namespace Train.Api.QueryHandlers
{
  public class GetWorkoutsQueryHandler : IGetWorkoutsQueryHandler
  {
    private readonly Container _cosmosContainer;

    public GetWorkoutsQueryHandler(Container cosmosContainer)
    {
      _cosmosContainer = cosmosContainer;
    }

    public async Task<GetWorkoutsResult> ExecuteAsync(GetWorkoutsQuery query)
    {
      var sql = $"SELECT c.workouts FROM c where c.userId = '{query.UserId}'";

      var iterator = _cosmosContainer.GetItemQueryIterator<GetWorkoutsResult>(sql);
      var documents = await iterator.ReadNextAsync();

      var list = documents.FirstOrDefault();

      //var q = from d in _cosmosContainer.GetItemLinqQueryable<Workout>()
      //        where d.

      return list;
    }
  }
}
