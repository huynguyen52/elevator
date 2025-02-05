const { ElevatorDirection } = require('../constants');
const Elevator = require('./elevator');

class EmergencyElevator extends Elevator {
  constructor(id) {
    super(id); // Call parent class constructor
    this._inEmergencyMode = false; // Track if the elevator is in emergency mode
  }

  get inEmergencyMode() {
    return this._inEmergencyMode;
  }

  set inEmergencyMode(inEmergencyMode) {
    this._inEmergencyMode = inEmergencyMode;
  }

  moveToFloor(floor) {
    if (this._inEmergencyMode) {
      this.queue = [floor]; // Clear the queue and move to the requested floor
      if (this.direction === ElevatorDirection.IDLE) {
        if (this.currentFloor < floor) {
          this.direction = ElevatorDirection.UP;
        } else if (this.currentFloor > floor) {
          this.direction = ElevatorDirection.DOWN;
        }
      }
      return;
    }

    super.moveToFloor(floor); // Normal behavior when not in emergency mode
  }
}

module.exports = EmergencyElevator;
