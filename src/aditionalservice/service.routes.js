'use strict'

const express = require('express');
const api = express.Router();
const serviceController = require('./sevice.controller');

 api.post('/add', serviceController.add);
api.get('/get', serviceController.get);
api.get('/getService/:id', serviceController.geService);
api.put('/update/:id', serviceController.update);
api.delete('/delete/:id', serviceController.delete); 


module.exports = api;