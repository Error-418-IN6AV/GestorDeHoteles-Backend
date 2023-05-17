'use strict'

const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    typeevent: String
});

module.exports = mongoose.model('type', typeSchema);
