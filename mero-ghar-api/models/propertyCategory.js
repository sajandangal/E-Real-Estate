const mongoose = require('mongoose');

const propertyCategorySchema = new mongoose.Schema({
    propertyCategory: {
        type: String,
        required: true
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }]
}, { timestamps: true });

module.exports = mongoose.model('PropertyCategory', propertyCategorySchema);