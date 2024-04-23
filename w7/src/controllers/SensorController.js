const Sensor = require('../models/SensorModels');

// Lấy tất cả dữ liệu Sensor
const getAllDataSensor = async (req, res) => { 
    try {
        const sensors = await Sensor.find();
        res.json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Lấy dữ liệu Sensor theo Id
const getDataSensorById = async (req, res) => { 
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
        res.json(sensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Tạo dữ liệu Sensor mới
const createDataSensor = async (req, res) => {
    const { id, name, value, recivedDate } = req.body;
    const sensor = new Sensor({
        id,
        name,
        value,
        recivedDate
    });
    try {
        const newSensor = await sensor.save();
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Cập nhật dữ liệu Sensor
const updateDataSensor = async (req, res) => {
    const { id, name, value, recivedDate } = req.body;
    try {
        const sensor = await Sensor.findByIdAndUpdate(req.params.id, {
            id,
            name,
            value,
            recivedDate
        }, { new: true });
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
        res.json(sensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Xóa dữ liệu Sensor
const deleteDataSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
        res.json({ message: 'Deleted Sensor' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllDataSensor,
    getDataSensorById,
    createDataSensor,
    updateDataSensor,
    deleteDataSensor
};
