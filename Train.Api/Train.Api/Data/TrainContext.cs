using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Train.Api.Models;
using Train.Api.Models.Sets;

namespace Train.Api.Data
{
  public class TrainContext : DbContext
  {
    public TrainContext(DbContextOptions<TrainContext> options)
      : base(options)
    { 
    }

    public DbSet<Workout> Workouts { get; set; }
    public DbSet<WorkoutExercise> WorkoutExercises { get; set; }
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<ExerciseSet> ExerciseSets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<StrengthSet>().HasBaseType<ExerciseSet>();
      modelBuilder.Entity<DurationSet>().HasBaseType<ExerciseSet>();
      modelBuilder.Entity<IntervalSet>().HasBaseType<ExerciseSet>();
    }
  }

  public class TrainContextFactory : IDesignTimeDbContextFactory<TrainContext>
  {
    public TrainContext CreateDbContext(string[] args)
    {
      var optionsBuilder = new DbContextOptionsBuilder<TrainContext>();
      optionsBuilder.UseSqlServer(Environment.GetEnvironmentVariable("SqlConnection")); // unable to read local.settings from here?

      return new TrainContext(optionsBuilder.Options);
    }
  }
}
