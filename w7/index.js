const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/mongoDB'); 
const SensorRoute = require('./src/routes/SensorRoute');
const UserRoute = require('./src/routes/UserRoute');
const MqttDataRoute = require('./src/routes/MqttDataRoute');

const MqttData = require('./src/models/MqttDataModel');
const port = 3000;
// connect to db
connectDB()
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
app.use(express.static('./src/config'));

app.get('/', (req, res) => {
  res.render('HomePage');
});


app.use(express.json());
app.use(cors());
app.use('/api', [
  SensorRoute,
  UserRoute,
  MqttDataRoute
]);

const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://broker.emqx.io");

client.on("connect", () => {
  client.subscribe("testTopic", (err) => {
  });
});

client.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());
  const mqttData = new MqttData({
    temp: data.temp,
    humid: data.humid,
    recivedDate: new Date()
  });
  mqttData.save();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
