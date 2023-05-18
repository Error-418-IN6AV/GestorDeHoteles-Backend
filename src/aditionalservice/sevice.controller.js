'use strict'

const Service = require('./service.model');
const Reservation = require('../reservation/reservation.model')

exports.add = async(req, res)=>{
    try{
        let data = req.body;


        let existService = await Service.findOne({name: data.name});
        if(existService) {
            return res.send({message: 'Service already created'})
        }

        let service = new Service(data);

        await service.save();
        return res.send({message: 'Service added sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating Service', error: err.message})
    }
}

exports.get = async(req, res)=>{
    try{
      
        let services = await Service.find()
        return res.send({message: 'Service found', services});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Services'});
    }
}

exports.getService = async(req, res)=>{
    try{
        let serviceId = req.params.id;
        let service = await Service.findOne({_id: serviceId})
        if(!service) return res.status(404).send({message: 'Service not found'});
        return res.send({message: 'Service found:', service});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Service'});
    }
}




exports.update = async(req, res)=>{
    try{
        let serviceId = req.params.id;
        let data = req.body;

        let existService = await Service.findOne({name: data.name});
        if(existService) {
            return res.send({message: 'Service already created'})
        }


        let seriveUpdate = await Service.findOneAndUpdate(
            {_id: serviceId},
            data,
            {new: true} 
        )
        if(!seriveUpdate) return res.status(404).send({message: 'Service not found and not updated'});
        return res.send({message: 'Service updated', seriveUpdate})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not updated', err: `Service ${err.keyValue.name} is already taken`});
    }
}


exports.delete = async(req, res)=>{
    try{
        let idService = req.params.id;
        let reservaExist = await Reservation.findOne({service: idService});
        if(reservaExist) {
            return res.status(400).send({message: 'El servicio está siendo utilizada'});
        }
        let deletedService = await Service.findOneAndDelete({_id: idService});
        if(!deletedService) return res.status(404).send({message: 'Error removing Service or already deleted'});
        return res.send({message: 'Serivice deleted sucessfully',deletedService});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error Serivice room'})
    }
}