using Microsoft.EntityFrameworkCore;

namespace Workouts.Api.Models
{
    public class WorkoutContext : DbContext
    {
        public WorkoutContext(DbContextOptions<WorkoutContext> options) : base(options)
        {
        }

        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Exercise> Exercises { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Workout>();
            builder.Entity<Exercise>();
            //builder.Entity<WorkoutExercise>().HasKey(w => new { w.WorkoutId, w.ExerciseId });
            base.OnModelCreating(builder);
        }
    }
}
