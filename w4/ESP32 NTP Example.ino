#include <LiquidCrystal_I2C.h>

#define LED_PIN 32
LiquidCrystal_I2C lcd(0x27,20,4); // set the LCD address to 0x27 for a 16 chars and 2 line display
#include "DHTesp.h"

#define DHT_PIN 15

#define PIR_SENSOR 12

DHTesp dhtSensor;




void setup() {

//config LED_PIN output

pinMode(LED_PIN, OUTPUT);

//setup for serial communication

Serial.begin(9600);

Serial.print("ESP32 collecting sensors data");

lcd.init(); // initialize the lcd

// Print a message to the LCD.

lcd.backlight();

lcd.setCursor(1,0);

lcd.print("ESP32 collecting data ...");

Serial.print("ESP32 collecting sensors data");

//setup for dht sensor

dhtSensor.setup(DHT_PIN, DHTesp::DHT22);

pinMode(PIR_SENSOR, INPUT);

delay(1000);

}

void loop() {



TempAndHumidity data = dhtSensor.getTempAndHumidity();

int temp = data.temperature;

int humid = data.humidity;

String stemp = String(temp) + "C";

String shumid = String(humid) + "%";

Serial.println("Temp: " + stemp);

Serial.println("Humidity: " + shumid);

Serial.println("---");

int pir_value = digitalRead(PIR_SENSOR);



lcd.clear();

lcd.setCursor(0,0);

lcd.print("Temp: ");

lcd.print(stemp);


lcd.setCursor(0,1);

lcd.print("Humidity: ");

lcd.print(shumid);



if(pir_value == 1){

digitalWrite(LED_PIN, HIGH);

Serial.println("LED ON");

Serial.println("Motion detected");


}

else{


digitalWrite(LED_PIN, LOW);

Serial.println("LED OFF");

Serial.println("Motion ended");



}

delay(500);


}