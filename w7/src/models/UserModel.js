const mongoose = require('mongoose');
const UserModel = {
    name : String,
    email : String,
    password : String
};

module.exports = mongoose.model('User', UserModel);