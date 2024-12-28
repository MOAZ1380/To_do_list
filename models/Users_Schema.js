const mongoose = require('mongoose');

const User_Schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    sex: {
        type: String,
        enum: ['male', 'female'], 
        required: true ,
    },
    photo: {
        type: String,
        default: null, 
    },
    createdAt: {
        type: Date,
        default:  Date.now          
    },
    email: {
        type: String,
        unique: true,              
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User_info", User_Schema);