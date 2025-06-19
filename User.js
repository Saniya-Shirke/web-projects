const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    token:String,
    verified:Boolean
});

module.exports = mongoose.model('User', userSchema);