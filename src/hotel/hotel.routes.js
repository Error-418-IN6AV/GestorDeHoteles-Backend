'use strict'

const express = require('express');
const api = express.Router();
const hotelController = require('./hotel.controller')

api.get('/test',  hotelController.test)
api.post('/add', hotelController.addHotel)
api.get('/getHotels', hotelController.getHotels)
api.get('/getHotel/:id', hotelController.getHotel)
api.put('/updateHotel/:id', hotelController.updateHotel)
api.delete('/deleteHotel/:id', hotelController.deleteHotel)
api.post('/search', hotelController.search)

module.exports = api;