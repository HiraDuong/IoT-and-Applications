const route = require('express').Router();
const mqttDataController = require('../controllers/MqttDataController');

// Define routes for mqtt data controllers
route.get('/mqttdata', mqttDataController.getAllDataMqtt);
route.get('/mqttdata/newest', mqttDataController.getNewestDataMqtt);
route.get('/mqttdata/led/:led', mqttDataController.ledControl);
module.exports = route;