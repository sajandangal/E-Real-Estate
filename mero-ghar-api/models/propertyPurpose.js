const mongoose = require('mongoose');

const propertyPurposeSchema = new mongoose.Schema({
    propertyPurpose: {
        type: String,
        required: true
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }]
}, { timestamps: true });

module.exports = mongoose.model('PropertyPurpose', propertyPurposeSchema);