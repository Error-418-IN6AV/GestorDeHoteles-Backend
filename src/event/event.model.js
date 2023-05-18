'use strict'

const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    nameevent: String,
    email: String,
    descriptionevent: String,
    date: String,
    price: Number,
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'type'}
});

module.exports = mongoose.model('Event', eventSchema);
