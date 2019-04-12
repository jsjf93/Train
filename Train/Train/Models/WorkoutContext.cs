using Microsoft.EntityFrameworkCore;

namespace Train.Models
{
    public class WorkoutContext : DbContext
    {
        public WorkoutContext(DbContextOptions<WorkoutContext> options) : base(options)
        {
        }

        public DbSet<Workout> Workouts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<DurationExercise>();
            builder.Entity<IntervalExercise>();
            builder.Entity<StrengthExercise>();
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
