'use strict'

const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    description:{
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    adminHotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    versionKey: false
});

module.exports = mongoose.model('Hotel', hotelSchema);
