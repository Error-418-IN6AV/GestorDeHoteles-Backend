'use strict'
const Room = require('../room/room.model')
const Reservation = require('./reservation.model')



exports.add = async(req, res)=>{
    try{
        //Capturar la data
        let data = req.body;
        //Capturar el id de la person logeada
        data.user = req.user.sub
        //Verificar que existe la habitacion
        let roomExist = await Room.findOne({_id: data.room})
        if(!roomExist) return res.send({message: 'La habitacion no existe'})
        if(roomExist.available === 'NO DISPONIBLE') return res.send({message: 'La habitacion no esta disponible'})
        // Verificar que el usuario no tenga una reservacion en la misma fecha y habitación
        let reservationExist = await Reservation.findOne({
            $and: [
                //{ room: data.room },
                { date: data.date },
                { user: req.user.sub }
            ]
        });
        if (reservationExist) return res.status(400).send({ message: 'You already have a reservation on this date.' });
        //cambiar el estado de la habitacion
        roomExist.available = 'NOAVAILABLE'
        await roomExist.save();
        //Crear la reservacion
        let reservation = new Reservation(data);
        await reservation.save();
        return res.send({message: 'Reservation created sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating reservation'});
    }
}

exports.getReservations = async(req, res)=>{
    try{
        let reservations = await Reservation.find();
        return res.send({reservations});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Reservations'});
    }
}

exports.update = async(req, res)=>{
    try{
        //capturar data
        let data = req.body;
        //obtener el id
        let reservationId = req.params.id;
        //validar que no se pueda actualizar a una habitacion ocupada
        let roomExist = await Room.findOne({_id: data.room});
        if (roomExist.available === 'NO DISPONIBLE') {
            return res.send({message: 'Habitacion ocupada'})
        }
        //obtener reserva actual
        let reservaActual = await Reservation.findOne({_id: reservationId})
        //actualizar bodega anterior
        let roomAnteior = await Room.findOne({_id: reservaActual.room})
        roomAnteior.available = 'DISPONIBLE'
        await roomAnteior.save()
        //Actualizar
        let updatedReservation = await Reservation.findOneAndUpdate(
            {_id: reservationId},
            data,
            {new: true}
        )
        //actualizar habitacion nueva
        roomExist.status = 'NOAVAILABLE'
        await roomExist.save();
        if(!updatedReservation) return res.status(404).send({message: 'Reserva not found and not updated'});
        return res.send({message: 'Reserva updated', updatedReservation});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating reservation'});
    }
}

exports.delete = async(req, res)=>{
    try{
        //obtener el id de la reserva a eliminar
        let reservationId = req.params.id;
        let deletedReservation = await Reservation.findOneAndDelete({_id: reservationId});
        if(!deletedReservation) return res.status(404).send({message: 'Error removing reservation or already deleted'});
        // Obtener la habitacion correspondiente a la reserva eliminada
        let room = await Room.findById(deletedReservation.room);
        if(!room) return res.status(404).send({message: 'Error finding habitacion'});
        // Cambiar el nombre de la habitacion a "DISPONIBLE"
        room.available = 'DISPONIBLE';
        await room.save();
        return res.send({message: 'reserva deleted sucessfully', deletedReservation});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error removing reserva'})
    }
}