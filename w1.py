import requests
import json
import time

def send_data_urlencoded(api_key, field1, field2, field3):
    url = f"https://api.thingspeak.com/update?api_key={api_key}&field1={field1}&field2={field2}&field3={field3}"
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
    url = f"https://api.thingspeak.com/channels/2489794/feeds.json?api_key={api_key}&results={results}"
    response = requests.get(url)
    data = response.json()
    feeds = data['feeds']
    for feed in feeds:
        field1 = feed['field1']
        field2 = feed['field2']
        field3 = feed.get('field3', 'N/A')  # Kiểm tra xem trường field3 có tồn tại không
        print(f"Field1 (Temperature): {field1}, Field2 (Humidity): {field2}, Field3 (Motion): {field3}")

# Thực hiện gửi dữ liệu lên Thingspeak
api_key = "ZVRY8XKDBLU0U245"

# Lặp vô hạn để lấy dữ liệu mỗi 30 giây
while True:
    # Lấy dữ liệu từ Thingspeak API
    print("Data received from Thingspeak API:")
    get_data(api_key)
    time.sleep(30)  # Chờ 30 giây trước khi lấy dữ liệu tiếp theo
