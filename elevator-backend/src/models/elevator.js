const { ElevatorDirection, DoorState } = require('../constants');

class Elevator {
  constructor(id) {
    this._id = id;
    this._currentFloor = 1;
    this._direction = ElevatorDirection.IDLE; // 'up', 'down', 'idle'
    this._queue = [];
    this._door = DoorState.CLOSE; // 'open', 'closed'
  }

  get id() {
    return this._id;
  }

  get currentFloor() {
    return this._currentFloor;
  }

  get direction() {
    return this._direction;
  }

  get door() {
    return this._door;
  }

  get queue() {
    return this._queue;
  }

  set queue(queue) {
    this._queue = queue;
  }

  set door(door) {
    this._door = door;
  }

  reset() {
    this._currentFloor = 1;
    this._direction = ElevatorDirection.IDLE;
    this._queue = [];
    this._door = DoorState.CLOSE;
  }

  moveToFloor(floor) {
    // Add the target floor to the queue if it's not already there
    if (!this._queue.includes(floor)) {
      this._queue.push(floor);
    }

    // Sort the queue based on direction
    this._queue.sort((a, b) => a - b);

    // Determine the direction if the elevator is idle
    if (this._direction === ElevatorDirection.IDLE) {
      if (this._currentFloor < floor) {
        this._direction = ElevatorDirection.UP;
      } else if (this._currentFloor > floor) {
        this._direction = ElevatorDirection.DOWN;
      }
    }
  }

  openDoor() {
    this._door = DoorState.OPEN;
  }

  closeDoor() {
    this._door = DoorState.CLOSE;
  }

  step() {
    if (this._queue.length === 0) {
      this._direction = ElevatorDirection.IDLE;
      return;
    }

    // Close the door if it was open
    this.closeDoor();

    // Move elevator based on direction
    if (this._direction === ElevatorDirection.UP) {
      this._currentFloor++;
    } else if (this._direction === ElevatorDirection.DOWN) {
      this._currentFloor--;
    }

    // Check if the current floor matches a queued floor
    if (this._queue.includes(this._currentFloor)) {
      // Stop at the floor and open the door
      this._queue = this._queue.filter(f => f !== this._currentFloor);
      this.openDoor();

      this._recalculateDirection();
    }
  }
  _recalculateDirection() {
    // Recalculate direction based on the remaining queue
    if (this._queue.length > 0) {
      const nextFloor = this._queue[0];
      if (nextFloor > this._currentFloor) {
        this._direction = ElevatorDirection.UP;
      } else if (nextFloor < this._currentFloor) {
        this._direction = ElevatorDirection.DOWN;
      } else {
        this._direction = ElevatorDirection.IDLE;
      }
    } else {
      this._direction = ElevatorDirection.IDLE;
    }
  }
}

module.exports = Elevator;
