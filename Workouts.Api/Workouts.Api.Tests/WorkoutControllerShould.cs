using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System.Collections.Generic;
using Workouts.Api.Controllers;
using Workouts.Api.Models;
using System.Linq;

namespace Workouts.Api.Tests
{
    public class WorkoutControllerShould
    {
        private ServiceProvider _provider;
        private WorkoutContext _context;

        [SetUp]
        public void Setup()
        {
            var services = new ServiceCollection();
            services.AddDbContext<WorkoutContext>(
                opt => opt.UseInMemoryDatabase("ExerciseLibrary"), ServiceLifetime.Transient);

            _provider = services.BuildServiceProvider();
            _context = _provider.GetService<WorkoutContext>();
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
        }

        [Test]
        public void GetAllWorkouts()
        {
            var sut = new WorkoutController(_context);

            sut.AddWorkout(new Workout {
                WorkoutName = "Back Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Pullups", ExerciseType = ExerciseType.Strength } }});
            sut.AddWorkout(new Workout {
                WorkoutName = "Chest Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Bench Press", ExerciseType = ExerciseType.Strength } }});
            sut.AddWorkout(new Workout {
                WorkoutName = "Cardio Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Running", ExerciseType = ExerciseType.Duration } }});

            var actual = sut.GetAllWorkouts();

            Assert.That(actual.Value.Count() == 3);
            Assert.That(actual.Value.Any(it => it.WorkoutName == "Back Day" && it.Exercises.Any(e => e.Name == "Pullups")));
            Assert.That(actual.Value.Any(it => it.WorkoutName == "Chest Day" && it.Exercises.Any(e => e.Name == "Bench Press")));
            Assert.That(actual.Value.Any(it => it.WorkoutName == "Cardio Day" && it.Exercises.Any(e => e.Name == "Running")));
        }

        [Test]
        public void GetAWorkout()
        {
            var sut = new WorkoutController(_context);

            sut.AddWorkout(new Workout
            {
                WorkoutName = "Back Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Pullups", ExerciseType = ExerciseType.Strength } }
            });
            sut.AddWorkout(new Workout
            {
                WorkoutName = "Chest Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Bench Press", ExerciseType = ExerciseType.Strength } }
            });
            sut.AddWorkout(new Workout
            {
                WorkoutName = "Cardio Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Running", ExerciseType = ExerciseType.Duration } }
            });

            var actual = sut.GetWorkout(2);
            
            Assert.That(actual.Value.WorkoutName == "Chest Day" && 
                actual.Value.Exercises.Any(e => e.Name == "Bench Press" && e.ExerciseType == ExerciseType.Strength));
        }

        [Test]
        public void AddAWorkout()
        {
            var sut = new WorkoutController(_context);
            sut.AddWorkout(new Workout
            {
                WorkoutName = "Back Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Pullups", ExerciseType = ExerciseType.Strength } }
            });

            var actual = sut.GetAllWorkouts().Value.Count();
            var expected = 1;

            Assert.That(actual.Equals(expected));
        }

        [Test]
        public void UpdateAWorkout()
        {
            var sut = new WorkoutController(_context);

            sut.AddWorkout(new Workout
            {
                WorkoutName = "Back Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Pullups", ExerciseType = ExerciseType.Strength } }
            });
            sut.AddWorkout(new Workout
            {
                WorkoutName = "Chest Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Bench Press", ExerciseType = ExerciseType.Strength } }
            });
            sut.AddWorkout(new Workout
            {
                WorkoutName = "Cardio Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Running", ExerciseType = ExerciseType.Duration } }
            });

            sut.UpdateWorkout(3, new Workout
            {
                Id = 3,
                WorkoutName = "Cardio Day 2",
                Exercises = new List<Exercise>
                {
                    new Exercise { Id = 3, Name = "Running", ExerciseType = ExerciseType.Duration, WorkoutId = 3 },
                    new Exercise { Id = 4, Name = "Jump Rope", ExerciseType = ExerciseType.Interval, WorkoutId = 3},
                }
            });

            var actual = sut.GetWorkout(3).Value;

            Assert.That(actual.WorkoutName == "Cardio Day 2" &&
                actual.Exercises.Any(e => e.Name == "Jump Rope" && e.ExerciseType == ExerciseType.Interval));
            Assert.That(actual.Exercises.Count() == 2);
        }

        [Test]
        public void DeleteAWorkout()
        {
            var sut = new WorkoutController(_context);

            sut.AddWorkout(new Workout
            {
                WorkoutName = "Back Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Pullups", ExerciseType = ExerciseType.Strength } }
            });
            sut.AddWorkout(new Workout
            {
                WorkoutName = "Chest Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Bench Press", ExerciseType = ExerciseType.Strength } }
            });
            sut.AddWorkout(new Workout
            {
                WorkoutName = "Cardio Day",
                Exercises = new List<Exercise> { new Exercise { Name = "Running", ExerciseType = ExerciseType.Duration } }
            });

            sut.DeleteWorkout(2);

            Assert.That(sut.GetAllWorkouts().Value.Count() == 2);
            Assert.That(sut.GetAllWorkouts().Value.All(w => w.WorkoutName != "Chest Day"));
        }
    }
}
