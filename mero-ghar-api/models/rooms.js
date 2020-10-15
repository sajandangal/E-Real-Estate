const mongoose = require('mongoose');

//SCHEMA FOR ROOMS
const roomSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    noofroom: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Rooms', roomSchema);