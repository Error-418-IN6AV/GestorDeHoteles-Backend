'use strict'

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    services: [{
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Reservation', reservationSchema);