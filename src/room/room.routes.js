'use strict'

const express = require('express');

const api = express.Router();
const roomController = require('./room.controller');
const { ensureAuth, isManager  } = require('../services/authenticated');

api.post('/add', [ensureAuth, isManager ], roomController.add);
api.get('/get', [ensureAuth, isManager ],roomController.get);
api.get('/getRooms', roomController.getRooms);
api.get('/getRoom/:id', [ensureAuth, isManager ],roomController.getRoom);
api.put('/update/:id', [ensureAuth, isManager ],roomController.update);

api.delete('/delete/:id', [ensureAuth, isManager ],roomController.delete); 


module.exports = api;