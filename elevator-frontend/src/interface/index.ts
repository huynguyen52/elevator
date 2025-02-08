import { ElevatorDirection } from '../enums';

export type ElevatorResponse = {
  id: number;
  currentFloor: number;
  direction: ElevatorDirection;
  door: string;
  queue: { floor: number; direction: ElevatorDirection }[];
  inEmergencyMode?: boolean;
  emergencyFloor?: number | null;
};
