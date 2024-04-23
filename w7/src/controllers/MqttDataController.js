const MqttData = require('../models/MqttDataModel');
// get data from db
const getAllDataMqtt = async (req, res) => {
  try {
    const data = await MqttData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get newest data from db
const getNewestDataMqtt = async (req, res) => {
  try {
    const data = await MqttData.find().sort({ recivedDate: -1 }).limit(1);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// led control
const mqtt = require("mqtt");
const ledControl = async (req, res) => {
    try {
        const { led } = req.params; // Lấy giá trị của led từ params
        const client = mqtt.connect("mqtt://broker.emqx.io");
        
        client.on("connect", () => {
            // Chuyển đổi led thành chuỗi trước khi gửi
            client.publish("testTopic2", led.toString(), (err) => {
                if (err) {
                    console.error('Error publishing message:', err);
                    res.status(500).json({ error: 'Error publishing message' });
                } else {
                    res.status(200).json({ message: 'Led control success' });
                }
            });
        });
    } catch (error) {
        console.error('Error controlling LED:', error);
        res.status(500).json({ error: 'Error controlling LED' });
    }
}

module.exports = { getAllDataMqtt, getNewestDataMqtt,ledControl };
