const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profilePicture: {
        type: String
    },
    fullName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);