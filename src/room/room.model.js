'use strict'

const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name:{
       type: String,
        required: true
    },


    description: {
        type: String,
        required: true
    },
    hotel: {
        type: String,
    /*     type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', */
        required: false
    },
    available:{
        type:String,
        require: true

    },
    date:{
        type:Date,
        require: true
    }

},

{
    versionKey: false
});

module.exports = mongoose.model('Room', roomSchema);