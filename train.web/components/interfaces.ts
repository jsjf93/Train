export interface IExercise {
  exerciseId?: number;
  exerciseName: string;
  bodyPartsUsed: IBodyPart[];
}

export interface IBodyPart {
  bodyPartId: number;
  name: string;
}