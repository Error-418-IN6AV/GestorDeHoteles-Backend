'use strict'

const express = require('express');
const api = express.Router();
const hotelController = require('./hotel.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated');

api.get('/test',  hotelController.test);
api.post('/add', [ensureAuth, isAdmin], hotelController.addHotel);
api.get('/getHotels', hotelController.getHotels);
api.get('/getHotel/:id', hotelController.getHotel);
api.put('/updateHotel/:id', [ensureAuth, isAdmin], hotelController.updateHotel);
api.delete('/deleteHotel/:id', [ensureAuth, isAdmin], hotelController.deleteHotel);
api.post('/search',  hotelController.search);

module.exports = api;