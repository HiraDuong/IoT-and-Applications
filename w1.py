import requests
import json

def send_data_urlencoded(api_key, field1, field2):
    url = f"https://api.thingspeak.com/update?api_key={api_key}&field1={field1}&field2={field2}"
    response = requests.get(url)
    return response

def send_data_json(api_key, field1, field2):
    url = f"https://api.thingspeak.com/update?api_key={api_key}"
    data = {
        "field1": field1,
        "field2": field2
    }
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.post(url, data=json.dumps(data), headers=headers)
    return response

def get_data(api_key, results=2):
    url = f"https://api.thingspeak.com/channels/1529099/feeds.json?api_key={api_key}&results={results}"
    response = requests.get(url)
    data = response.json()
    feeds = data['feeds']
    for feed in feeds:
        field1 = feed['field1']
        field2 = feed['field2']
        print(f"Field1 (Temperature): {field1}, Field2 (Humidity): {field2}")

# Thực hiện gửi dữ liệu lên Thingspeak
api_key = "T7H40F0X82VGW7L5"
field1 = 20
field2 = 33

response1 = send_data_urlencoded(api_key, field1, field2)
print("Response from sending data via URL encoded method:", response1.text)

response2 = send_data_json(api_key, field1, field2)
print("Response from sending data via JSON method:", response2.text)

# Lấy dữ liệu từ Thingspeak API
print("Data received from Thingspeak API:")
get_data(api_key)
