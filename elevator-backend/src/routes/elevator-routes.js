const express = require('express');
const ElevatorService = require('../services/elevator-service');

const router = express.Router();

router.get('/status', (req, res) => {
  res.json(ElevatorService.getStatus());
});

router.get('/reset', (req, res) => {
  ElevatorService.reset();
  res.json(ElevatorService.getStatus());
});

router.post('/request', (req, res) => {
  const { floor, direction } = req.body;
  ElevatorService.requestElevator(floor, direction);
  res.json(ElevatorService.getStatus());
});

router.post('/move', (req, res) => {
  ElevatorService.step();
  res.json(ElevatorService.getStatus());
});

router.post('/toggle-door', (req, res) => {
  const { elevatorId, state } = req.body;
  ElevatorService.toggleDoor(elevatorId, state);
  res.json(ElevatorService.getStatus());
});

router.post('/activate-emergency', (req, res) => {
  const { elevatorId, isActive } = req.body;
  ElevatorService.activateEmergency(elevatorId, isActive);
  res.json(ElevatorService.getStatus());
});

module.exports = router;
