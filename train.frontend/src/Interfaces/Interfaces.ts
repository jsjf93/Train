export interface Workout {
  id: number;
  name: string;
  lastPerformed?: Date;
  bodyPartsUsed?: string[];
}
