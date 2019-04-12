using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Train.Models;

namespace Train.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly TrainContext _context;

        public WorkoutController(TrainContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Workout>> GetAllWorkouts()
        {
            return _context.Workouts.ToList();
        }
        
        [HttpGet("{id}")]
        public ActionResult<Workout> GetWorkout(int id)
        {
            var workout = _context.Workouts.Find(id);

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

            return CreatedAtAction(nameof(GetWorkout), new { id = workout.Id }, workout);
        }

        // PUT api/workout/5
        [HttpPut("{id}")]
        public ActionResult<Workout> Put(int id, [FromBody] Workout workout)
        {
            if(id != workout.Id)
            {
                return BadRequest();
            }

            _context.Entry(workout).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE api/workout/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var workout = _context.Workouts.Find(id);

            if(workout == null)
            {
                return NotFound();
            }

            _context.Workouts.Remove(workout);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
