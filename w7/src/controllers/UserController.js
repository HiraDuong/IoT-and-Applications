const User = require('../models/UserModel');

// get all user data
const getAllDataUser = async (req, res) => { 
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// get user data by id
const getDataUserById = async (req, res) => { 
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// create new user data
const createDataUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
        name,
        email,
        password
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// update user data
const updateDataUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// delete user data
const deleteDataUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllDataUser,
    getDataUserById,
    createDataUser,
    updateDataUser,
    deleteDataUser
}