const express = require('express');
const sensorController = require('../controllers/SensorController');

const router = express.Router();

// Define routes for sensor controllers
router.get('/sensors', sensorController.getAllDataSensor);
router.get('/sensors/:id', sensorController.getDataSensorById);
router.post('/sensors', sensorController.createDataSensor);
router.put('/sensors/:id', sensorController.updateDataSensor);
router.delete('/sensors/:id', sensorController.deleteDataSensor);

module.exports = router;