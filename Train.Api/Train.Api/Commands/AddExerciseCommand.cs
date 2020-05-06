﻿using System.Collections.Generic;
using Train.Api.Models;

namespace Train.Api.Commands
{
    public class AddExerciseCommand
    {
        public string Name { get; set; }
        public ICollection<BodyPart> BodyParts { get; set; }
    }
}
