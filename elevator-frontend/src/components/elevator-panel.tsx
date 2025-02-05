import { useEffect, useState } from 'react';
import {
  requestElevator,
  moveElevators,
  toggleDoor,
  resetElevators,
  toggleElevatorEmergency,
} from '../api/elavator.api';
import { ElevatorResponse } from '../interface';
import Elevator from './elevator';
import { DoorState } from '../enums';

const ElevatorPanel = () => {
  const [elevators, setElevators] = useState<ElevatorResponse[]>([]);
  const [isEmergency, setIsEmergency] = useState(false);

  const handleToggleEmergency = async (elevatorId: number) => {
    const isActive = !isEmergency;
    setIsEmergency(isActive);
    const status = await toggleElevatorEmergency(elevatorId, isActive);
    updateStatus(status);
  };

  const reset = async () => {
    const status = await resetElevators();
    setElevators(status);
  };

  const updateStatus = async (status: ElevatorResponse[]) => {
    setElevators(status);
  };

  const handleRequest = async (floor: number, direction: string) => {
    const status = await requestElevator(floor, direction);
    updateStatus(status);
  };

  const handleMove = async () => {
    const status = await moveElevators();
    updateStatus(status);
  };

  const handleToggleDoor = async (elevatorId: number, state: string) => {
    const status = await toggleDoor(elevatorId, state);
    updateStatus(status);
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className="space-y-8">
      <button
        onClick={handleMove}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      >
        Move Elevators
      </button>
      <div className="flex space-x-16 items-end">
        {elevators.map(elevator => {
          const emergencyElevator = elevator.inEmergencyMode !== undefined;
          return (
            <div key={elevator.id}>
              {emergencyElevator && (
                <button
                  onClick={() => handleToggleEmergency(elevator.id)}
                  className={`cursor-pointer block w-full mx-auto ${
                    isEmergency && 'text-red-400'
                  }`}
                >
                  Emergency
                </button>
              )}
              <p className="text-center uppercase">Elevator {elevator.id}</p>
              {Array.from({ length: 10 }, (_, i) => {
                const floor = 10 - i;
                return (
                  <Elevator
                    key={floor}
                    floor={floor}
                    active={floor === elevator.currentFloor}
                    open={
                      floor === elevator.currentFloor &&
                      elevator.door === DoorState.OPEN
                    }
                    queue={elevator.queue || []}
                    onCallElevator={handleRequest}
                    onToggleDoor={(state: string) =>
                      handleToggleDoor(elevator.id, state)
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ElevatorPanel;
