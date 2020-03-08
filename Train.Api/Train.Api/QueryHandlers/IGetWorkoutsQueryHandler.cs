using System.Threading.Tasks;
using Train.Api.Queries;
using Train.Api.Results;

namespace Train.Api.QueryHandlers
{
  public interface IGetWorkoutsQueryHandler
  {
    public Task<GetWorkoutsResult> ExecuteAsync(GetWorkoutsQuery query);
  }
}
