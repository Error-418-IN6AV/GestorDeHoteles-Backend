'use strict'

const express = require('express');
const api = express.Router();
const eventController = require('./event.controller');

api.get('/test', eventController.testEvent);
api.post('/add', eventController.addEvent);
api.get('/get', eventController.getEvent);
api.get('/get/:id', eventController.getevent);
api.put('/update/:id', eventController.updateEvent);
api.delete('/delete/:id', eventController.deleteEvent);

module.exports = api;