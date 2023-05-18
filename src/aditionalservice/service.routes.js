'use strict'

const express = require('express');
const api = express.Router();
const { ensureAuth, isManager} = require('../services/authenticated');
const serviceController = require('./sevice.controller');

 api.post('/add', [ensureAuth, isManager ],serviceController.add);
api.get('/get', serviceController.get);
api.get('/getService/:id', serviceController.getService);
api.put('/update/:id', [ensureAuth, isManager ],serviceController.update);
api.delete('/delete/:id', [ensureAuth, isManager ],serviceController.delete); 


module.exports = api;