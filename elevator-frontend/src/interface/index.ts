import { ElevatorDirection } from '../enums';

export type ElevatorResponse = {
  id: number;
  currentFloor: number;
  direction: ElevatorDirection;
  door: string;
  queue: number[];
  inEmergencyMode?: boolean;
  emergencyFloor?: number | null;
};
