export interface Workout {
  id: number;
  name: string;
  lastPerformed?: Date;
  bodyPartsUsed?: string[];
}

export interface Exercise {
  id: number;
  name: string;
  bodyPartsUsed: string[];
}
