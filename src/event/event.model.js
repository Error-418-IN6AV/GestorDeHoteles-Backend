'use strict'

const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String,
    email: String,
    description: String,
    date: String,
    price: Number,
    typeevent: {type: mongoose.Schema.Types.ObjectId, ref: 'type'}
});

module.exports = mongoose.model('Event', eventSchema);
