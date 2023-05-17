'use strict'

require('dotenv').config()
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const typeController = require('./src/type/type.controller');

mongoConfig.connect();
app.initServer();
typeController.defaultType();