const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    properties: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);