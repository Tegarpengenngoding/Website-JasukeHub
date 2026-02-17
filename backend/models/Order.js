const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add amount'],
        min: 0
    },
    status: {
        type: String,
        enum: ['in_progress', 'delivered', 'revision', 'completed'],
        default: 'in_progress'
    },
    revisionsUsed: {
        type: Number,
        default: 0,
        min: 0
    },
    maxRevisions: {
        type: Number,
        default: 3,
        min: 0
    },
    revisionNotes: [{
        note: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
