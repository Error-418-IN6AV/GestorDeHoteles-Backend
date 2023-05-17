'use strict'

const express = require('express');
const api = express.Router();
const typeController = require('./type.controller');
const { ensureAuth, isManager, isAdmin } = require('../services/authenticated');

api.get('/test', typeController.testType);
api.post('/add', [ ensureAuth, isManager, isAdmin ], typeController.addType);
api.get('/get', typeController.getTypes);
api.get('/get/:id', typeController.getType);
    
module.exports = api;