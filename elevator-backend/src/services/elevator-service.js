const ElevatorSystem = require('../models/elevator-system');

const elevatorSystem = new ElevatorSystem(10); // 10 floors

module.exports = {
  requestElevator(floor, direction) {
    elevatorSystem.requestElevator(floor, direction);
  },

  step() {
    elevatorSystem.step();
  },

  getStatus() {
    return elevatorSystem.getElevatorsStatus();
  },

  reset() {
    elevatorSystem.reset();
  },

  toggleDoor(elevatorId, state) {
    elevatorSystem.toggleDoor(elevatorId, state);
  },

  activateEmergency(elevatorId, isActive) {
    elevatorSystem.activateEmergency(elevatorId, isActive);
  },
};
