using System;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Train.Api.CommandHandlers;
using Train.Api.Data;
using Train.Api.Factories;
using Train.Api.Repository;

[assembly: FunctionsStartup(typeof(Train.Api.Startup))]

namespace Train.Api
{
  public class Startup : FunctionsStartup
  {
    public override void Configure(IFunctionsHostBuilder builder)
    {

      string SqlConnection = Environment.GetEnvironmentVariable("SqlConnection");
      builder.Services.AddDbContext<TrainContext>(
          options => options.UseSqlServer(SqlConnection));
      builder.Services.AddScoped<IAddWorkoutCommandHandler, AddWorkoutCommandHandler>();
      builder.Services.AddScoped<IAddExerciseCommandHandler, AddExerciseCommandHandler>();
      builder.Services.AddScoped<IWorkoutFactory, WorkoutFactory>();
      builder.Services.AddScoped<IDataRepository, DataRepository>();
    }
  }
}