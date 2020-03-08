using System;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Train.Api.CommandHandlers;
using Train.Api.Helpers;
using Train.Api.QueryHandlers;

[assembly: FunctionsStartup(typeof(Train.Api.Startup))]

namespace Train.Api
{
  public class Startup : FunctionsStartup
  {
    public override void Configure(IFunctionsHostBuilder builder)
    {
      //builder.Services.AddHttpClient();

      //builder.Services.AddSingleton((s) => {
      //    return new MyService();
      //});
      var test = Environment.GetEnvironmentVariable("CosmosContainerId");
      builder.Services.AddSingleton<IAddWorkoutCommandHandler, AddWorkoutCommandHandler>();
      builder.Services.AddSingleton<IGetWorkoutsQueryHandler>(s =>
        new GetWorkoutsQueryHandler(
          CosmosDbHelper.Client.GetContainer(
            Environment.GetEnvironmentVariable("CosmosDatabaseId"),
            Environment.GetEnvironmentVariable("CosmosContainerId"))));
    }
  }
}