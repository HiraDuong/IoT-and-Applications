import paho.mqtt.client as mqtt
import time
import json

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(subTopic)

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload.decode("utf-8")))

subTopic = "iot"
pubTopic = "iot"
data = {
    "DeviceId": 11, 
    "packet_no": 126,
    "temperature": 30, 
    "humidity": 60
}
qos = 1
broker = "broker.hivemq.com"
client_id = "584b87cd-74f2-4ff8-812b-71f37831f631"

client = mqtt.Client(client_id)
client.on_connect = on_connect
client.on_message = on_message

client.connect(broker, 1883, 60)
client.loop_start()

while True:
    client.publish(pubTopic, json.dumps(data), qos=qos)
    time.sleep(5) 

# client.loop_forever() 
