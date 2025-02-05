import { ElevatorResponse } from '../interface';
import axiosClient from './axios-client';

export const requestElevator = async (
  floor: number,
  direction: string,
): Promise<ElevatorResponse[]> => {
  return axiosClient.post('/api/elevators/request', {
    floor,
    direction,
  });
};

export const moveElevators = async (): Promise<ElevatorResponse[]> => {
  return axiosClient.post('/api/elevators/move');
};

export const toggleDoor = async (
  elevatorId: number,
  state: string,
): Promise<ElevatorResponse[]> => {
  return axiosClient.post('/api/elevators/toggle-door', { elevatorId, state });
};

export const resetElevators = async (): Promise<ElevatorResponse[]> => {
  return axiosClient.get('/api/elevators/reset');
};

export const toggleElevatorEmergency = async (
  elevatorId: number,
  isActive: boolean,
): Promise<ElevatorResponse[]> => {
  return axiosClient.post('/api/elevators/activate-emergency', {
    elevatorId,
    isActive,
  });
};
