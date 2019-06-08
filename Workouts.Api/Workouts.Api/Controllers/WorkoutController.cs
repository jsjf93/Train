using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Workouts.Api.Models;

namespace Workouts.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly WorkoutContext _context;

        public WorkoutController(WorkoutContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Workout>> GetAllWorkouts()
        {
            return _context.Workouts.Include(w => w.Exercises).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Workout> GetWorkout(int id)
        {
            var workout = _context.Workouts.Where(w => w.Id == id)
                .Include(w => w.Exercises).FirstOrDefault();

            if (workout == null)
            {
                return NotFound();
            }

            return workout;
        }

        // POST api/workout
        [HttpPost]
        public ActionResult<Workout> AddWorkout([FromBody] Workout workout)
        {
            _context.Workouts.Add(workout);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetWorkout), new { id = workout.Id }, _context.Workouts.Find(workout.Id));
        }

        // PUT api/workout/5
        [HttpPut("{id}")]
        public ActionResult<Workout> UpdateWorkout(int id, [FromBody] Workout workout)
        {
            if (id != workout.Id)
            {
                return BadRequest();
            }

            var workoutEntity = _context.Workouts.FirstOrDefault(w => w.Id == id);

            if (workoutEntity != null)
            {
                var exerciseToRemove = _context.Exercises
                    .Where(e => e.WorkoutId == id)
                    .Except(workout.Exercises)
                    .ToList();
                _context.Exercises.RemoveRange(exerciseToRemove);

                workoutEntity.WorkoutName = workout.WorkoutName;

                workout.Exercises.ForEach(e =>
                {
                    e.WorkoutId = id;
                    var exerciseEntity = _context.Exercises.FirstOrDefault(ex => ex.Id == e.Id);

                    if (exerciseEntity != null)
                    {
                        _context.Entry(exerciseEntity).State = EntityState.Detached;
                        _context.Entry(e).State = EntityState.Modified;
                    }
                    else
                    {
                        _context.Exercises.Add(e);
                    }
                });

                _context.Workouts.Update(workoutEntity);
            }
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE api/workout/5
        [HttpDelete("{id}")]
        public ActionResult DeleteWorkout(int id)
        {
            var workout = _context.Workouts.Where(w => w.Id == id)
                .Include(w => w.Exercises).FirstOrDefault();

            if (workout == null)
            {
                return NotFound();
            }

            _context.Workouts.Remove(workout);
            workout.Exercises.ForEach(e => _context.Exercises.Remove(e));
            _context.SaveChanges();

            return NoContent();
        }
    }
}
