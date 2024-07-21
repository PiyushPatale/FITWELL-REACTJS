
const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    orderId: {
        type: String,
        // required: true,
    },
    amount: { 
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['created', 'paid', 'failed'],
        default: 'created',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('razorpaypayments', orderModel);

module.exports =  Order ;
