'use strict'

const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },


    description: {
        type: String,
        required: false
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    available:{
        type:String,
        require: true

    },
    date:{
        type:String,
        require: false
    },value:{

        type:Number,
        require:false,
    }

},

{
    versionKey: false
});

module.exports = mongoose.model('Room', roomSchema);