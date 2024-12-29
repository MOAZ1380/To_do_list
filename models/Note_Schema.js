const mongoose = require('mongoose');
const { contains } = require('validator');

const Note_Schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    contains: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default:  Date.now          
    },
    updatedAt: {
        type: Date,
        default:  Date.now          
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_info',
        required: true
    }
});

module.exports = mongoose.model("Note", Note_Schema);