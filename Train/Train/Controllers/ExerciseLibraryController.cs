using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Train.Models;

namespace Train.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseLibraryController : ControllerBase
    {
        private readonly ExerciseLibraryContext _context;

        public ExerciseLibraryController(ExerciseLibraryContext context)
        {
            _context = context;
        }

        // GET: api/ExerciseLibrary
        [HttpGet]
        public IEnumerable<Exercise> GetAllExercises()
        {
            return _context.Exercises.ToList();
        }

        // GET: api/ExerciseLibrary/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<Exercise> GetExercise(int id)
        {
            var exercise = _context.Exercises.Find(id);

            if (exercise == null)
            {
                return NotFound();
            }

            return exercise;
        }

        // POST: api/ExerciseLibrary
        [HttpPost]
        public ActionResult<Exercise> AddExercise([FromBody] Exercise exercise)
        {
            _context.Exercises.Add(exercise);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetExercise), new { id = exercise.Id }, exercise);
        }

        // PUT: api/ExerciseLibrary/5
        [HttpPut("{id}")]
        public ActionResult<Exercise> UpdateExercise(int id, [FromBody] Exercise exercise)
        {
            if (id != exercise.Id)
            {
                return BadRequest();
            }

            _context.Entry(exercise).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult DeleteExercise(int id)
        {
            var exercise = _context.Exercises.Find(id);

            if (exercise == null)
            {
                return NotFound();
            }

            _context.Exercises.Remove(exercise);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
