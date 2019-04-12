using Microsoft.EntityFrameworkCore;

namespace Train.Models
{
    public class TrainContext : DbContext
    {
        public TrainContext(DbContextOptions<TrainContext> options) : base(options)
        {
        }

        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Exercise>();
            builder.Entity<Workout>();
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
