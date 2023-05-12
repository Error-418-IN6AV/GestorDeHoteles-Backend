'use strict'

const express = require('express');

const api = express.Router();
const roomController = require('./room.controller');


api.post('/add', roomController.add);
api.get('/get', roomController.get);
api.get('/getRoom/:id', roomController.getRoom);
api.put('/update/:id', roomController.update);
api.post('/search', roomController.search);
api.put('/updateState/:id', roomController.updateState);
api.delete('/delete/:id', roomController.delete); 


module.exports = api;