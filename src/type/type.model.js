'use strict'

const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    name: String,
    description: String,
});

module.exports = mongoose.model('type', typeSchema);
