const { ElevatorDirection } = require('../constants');
const Elevator = require('./elevator');
const EmergencyElevator = require('./emergency-elevator');

class ElevatorSystem {
  constructor(numFloors) {
    this.numFloors = numFloors;
    this.elevators = [
      new Elevator(1),
      new Elevator(2),
      new EmergencyElevator(3),
    ];
  }

  requestElevator(floor, direction) {
    let availableElevator = this.findNearestElevator(floor, direction);
    if (availableElevator) {
      availableElevator.moveToFloor({ floor, direction });
    }
  }

  activateEmergency(elevatorId, isActive) {
    const emergencyElevator = this.elevators.find(
      elevator =>
        elevator.id === elevatorId && elevator instanceof EmergencyElevator,
    );
    if (emergencyElevator) {
      emergencyElevator.inEmergencyMode = isActive;
    }
  }

  findNearestElevator(floor, direction) {
    let nearestElevator = null;
    let minDistance = Infinity;

    this.elevators.forEach(elevator => {
      const { currentFloor, direction: elevatorDirection, queue } = elevator;
      const distance = Math.abs(currentFloor - floor);

      // Check if the elevator is idle
      if (elevatorDirection === ElevatorDirection.IDLE) {
        if (distance < minDistance) {
          minDistance = distance;
          nearestElevator = elevator;
        }
      }
      // Check if elevator is moving towards the requested floor in the same direction
      else if (elevatorDirection === direction) {
        if (direction === ElevatorDirection.UP) {
          if (
            currentFloor <= floor &&
            (queue.length === 0 ||
              Math.max(...queue.map(q => q.floor)) >= floor ||
              Math.max(...queue.map(q => q.floor)) < floor)
          ) {
            if (distance < minDistance) {
              minDistance = distance;
              nearestElevator = elevator;
            }
          }
        } else if (direction === ElevatorDirection.DOWN) {
          if (
            currentFloor >= floor &&
            (queue.length === 0 ||
              Math.min(...queue.map(q => q.floor)) <= floor ||
              Math.min(...queue.map(q => q.floor)) > floor)
          ) {
            if (distance < minDistance) {
              minDistance = distance;
              nearestElevator = elevator;
            }
          }
        }
      }
    });

    return nearestElevator;
  }

  step() {
    this.elevators.forEach(elevator => elevator.step());
  }

  getElevatorsStatus() {
    return this.elevators.map(elevator => ({
      id: elevator.id,
      currentFloor: elevator.currentFloor,
      direction: elevator.direction,
      door: elevator.door,
      queue: elevator.queue,
      ...(elevator instanceof EmergencyElevator && {
        inEmergencyMode: elevator.inEmergencyMode,
        emergencyFloor: elevator.emergencyFloor,
      }),
    }));
  }

  reset() {
    this.elevators.forEach(elevator => elevator.reset());
  }

  toggleDoor(elevatorId, state) {
    const elevator = this.elevators.find(
      elevator => elevator.id === elevatorId,
    );
    if (elevator) {
      elevator.door = state;
    }
  }
}

module.exports = ElevatorSystem;
