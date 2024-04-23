console.log('Home Page Script Loaded');

const initializeHomePageScript = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const ledBtn = document.getElementById('led-btn');
        ledBtn.addEventListener('click', async () => {
            try {
                let response;
                if (ledBtn.textContent === 'Turn on Led') {
                    response = await fetch('http://localhost:3000/api/mqttdata/led/1');
                    ledBtn.textContent = 'Turn off Led';
                    ledBtn.style.backgroundColor = '#f44336';
                } else {
                    response = await fetch('http://localhost:3000/api/mqttdata/led/0');
                    ledBtn.textContent = 'Turn on Led';
                    ledBtn.style.backgroundColor = '#4CAF50';
                }
                if (!response.ok) {
                    throw new Error('Error controlling LED: ' + response.statusText);
                }
            } catch (error) {
                console.error('Error handling LED button click:', error);
            }
        });
    });
};

initializeHomePageScript();


const getSensorData = async () => {
    const response = await fetch('http://localhost:3000/api/sensors');
    const data = await response.json();
    return data;
  }

getSensorData().then(data => {
    const sensorDataList = document.getElementById('sensor-list-container');
    for (let i = 0; i < data.length; i++) {
        const sensorData = data[i];
        const sensorDataItem = document.createElement('div');
        sensorDataItem.className = 'sensor-data-item';
        sensorDataItem.innerHTML = `
            <div class="sensor-data-item__name">${sensorData.name}</div>
            <div class="sensor-data-item__value">${sensorData.value}</div>
        `;
        sensorDataList.appendChild(sensorDataItem);
        }
    console.log(data);
  });

  const getMqttData = async () => {
    const response = await fetch('http://localhost:3000/api/mqttdata/newest');
    const data = await response.json();
    return data;
  }
  
  const updateData = async () => {
    try {
      const data = await getMqttData();
      
      const dhtData = document.getElementById('dht-data');
      dhtData.innerHTML = `
          <div class="dht-data__temp">Temperature: ${data[0].temp}</div>
          <div class="dht-data__humid">Humidity: ${data[0].humid}</div>
      `;
    } catch (error) {
      console.error('Error fetching MQTT data:', error);
    }
  }
  
  // Lấy dữ liệu ban đầu
  updateData();
  
  // Lặp lại việc cập nhật dữ liệu sau mỗi 5 giây
  setInterval(updateData, 5000); // Cập nhật mỗi 5 giây (5000 miliseconds)
  