using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Train.Api.Models;
using Train.Api.Models.Enums;
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
    public DbSet<ExerciseSet> ExerciseSets { get; set; }
    public DbSet<Duration> Durations { get; set; }

    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<BodyPart> BodyParts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<ExerciseSet>()
        .HasDiscriminator(p => p.ExerciseType)
        .HasValue<StrengthSet>(ExerciseType.Strength)
        .HasValue<DurationSet>(ExerciseType.Duration)
        .HasValue<IntervalSet>(ExerciseType.Interval);
    }
  }

  public class TrainContextFactory : IDesignTimeDbContextFactory<TrainContext>
  {
    public TrainContext CreateDbContext(string[] args)
    {
      IConfigurationRoot configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();
      var connectionString = configuration.GetConnectionString("DefaultConnection");

      var optionsBuilder = new DbContextOptionsBuilder<TrainContext>();
      optionsBuilder.UseSqlServer(connectionString);

      return new TrainContext(optionsBuilder.Options);
    }
  }
}
