'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const hotelRoutes = require('../src/hotel/hotel.routes')
const roomRoutes = require('../src/room/room.routes')
const reservationRoutes = require('../src/reservation/reservation.routes')
const servicesRoutes = require('../src/aditionalservice/service.routes')
const userRoutes = require('../src/user/user.routes')
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/hotel', hotelRoutes);
app.use('/room', roomRoutes);
app.use('/reserva', reservationRoutes);
app.use('/service', servicesRoutes)
app.use('/user', userRoutes)
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
} 