const APIurl = 'http://localhost:3000/api';

const body = {
    id: '1',
    name: 'Sensor 1',
    value: 20,
    recivedDate: new Date()
};

// send POST request to create new sensor data
const postRequest = async () => {
    const response = await fetch(`${APIurl}/sensors`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log(data);
}

postRequest();