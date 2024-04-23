const mongoose = require('mongoose');
const SensorModels = {
    name : String,
    value : Number,
    recivedDate : Date
};

module.exports = mongoose.model('Sensor', SensorModels);
