const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    report: {
        type: String,
        require: true
    },
    properties: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    reported_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Report', reportSchema);