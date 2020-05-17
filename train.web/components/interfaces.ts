export interface IDictionary<T> {
  [key: string]: T;
}

export interface IExercise {
  exerciseId: number;
  exerciseName: string;
  bodyPartsUsed: IBodyPart[];
}

export interface IBodyPart {
  bodyPartId?: number;
  bodyPartName: string;
}