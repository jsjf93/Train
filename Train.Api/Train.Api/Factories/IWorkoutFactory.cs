using Train.Api.DTOs;
using Train.Api.Models;

namespace Train.Api.Factories
{
  public interface IWorkoutFactory
  {
    Workout Create(CreateWorkoutDto workoutDto);
  }
}
