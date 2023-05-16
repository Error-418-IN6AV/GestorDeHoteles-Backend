'use strict'

const express = require('express');
const api = express.Router();
const reservationController = require('./reservation.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

api.post('/add', /* ensureAuth, */ reservationController.add);
api.put('/update/:id', /* ensureAuth, */ reservationController.update);
api.delete('/delete/:id', /* ensureAuth, */ reservationController.delete);
api.get('/get', /* ensureAuth,  */reservationController.getReservations);
api.get('/getId/:id', reservationController.getReservationById)
module.exports = api;