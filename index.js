'use strict'

require('dotenv').config()
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const userController = require('./src/user/user.controller');
const typeController = require('./src/type/type.controller');

mongoConfig.connect();
app.initServer();
userController.userAdmin();
typeController.defaultType();