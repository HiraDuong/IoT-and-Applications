const mongoose = require('mongoose');
const MqttDataModel = {
    temp: Number,
    humid: Number,
    recivedDate: Date
};
module.exports = mongoose.model('MqttData', MqttDataModel);