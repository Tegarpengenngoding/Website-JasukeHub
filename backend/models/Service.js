const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['VR Development', 'AR Development', '3D Modeling', 'Animation', '360 Content']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: 0
    },
    deliveryTime: {
        type: String,
        required: [true, 'Please add delivery time']
    },
    revisions: {
        type: Number,
        default: 3,
        min: 0
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    portfolio: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
