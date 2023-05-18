'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;
const userRoutes = require('../src/user/user.routes');
const eventRoutes = require('../src/event/event.routes');
const typeRoutes = require('../src/type/type.routes');
const roomRoutes = require('../src/room/room.routes');
const serviceRouter = require('../src/aditionalservice/service.routes');
const hotelRouter = require('../src/hotel/hotel.routes');
const reservationRoutes = require('../src/reservation/reservation.routes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/user',userRoutes);
app.use('/event', eventRoutes);
app.use('/type', typeRoutes);
app.use('/room', roomRoutes);
app.use('/service',serviceRouter);
app.use('/hotel',hotelRouter);
app.use('/reserva', reservationRoutes);

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
} 