const mongoose = require('mongoose');

//SCHEMA FOR FACILITIES
const facilitySchema = new mongoose.Schema({
    facility: {
        type: String,
        required: true
    }
});

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

});

//SCHEMA FOR ACCEPTING COMENTS FOR PROPERTY
const commentschema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


//SCHEMA FOR PROPERTIES
const propertySchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: String,
    },

    //Temporary Updated category for simplifying property data structure
    category: {
        type: String,
    },

    //Temporary Updated category for simplifying property data structure
    purpose: {
        type: String,
    },

    //After DB Update
    //Temporary Updated attributes facilities for simplifying property data structure 
    facility1: {
        type: String
    },
    facility2: {
        type: String
    },
    facility3: {
        type: String
    },
    facility4: {
        type: String
    },

    //Temporary Updated rooms attributes for simplifying property data structure
    bedroom: {
        type: String
    },
    livingroom: {
        type: String
    },
    kitchen: {
        type: String
    },
    bathroom: {
        type: String
    },

    //facilities for consistent DB Structure
    facilities: [{
        type: String
    }],
    //or
    facilities: [facilitySchema],

    //Rooms for consistent DB Structure
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rooms'
    }],
    //Or
    rooms: [roomSchema],

    //comments for consistent DB Structure
    comments: [commentschema]

}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);