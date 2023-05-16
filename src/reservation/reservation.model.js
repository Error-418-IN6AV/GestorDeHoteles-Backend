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
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    }/* ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } */
}, {
    versionKey: false
});

reservationSchema.set('toJSON', {
    transform: function(doc, ret, options) {
      ret.date = ret.date.toISOString().slice(0,10); // Transform date to YYYY-MM-DD format
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  });

module.exports = mongoose.model('Reservation', reservationSchema);