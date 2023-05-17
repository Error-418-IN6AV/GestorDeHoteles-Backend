'use strict'
 
const { validateData, checkUpdate } = require('../utils/validate'); 
const Room = require('./room.model');
const Hotel = require('../hotel/hotel.model')



exports.add = async(req, res)=>{
    try{
        let data = req.body;
        data.available = 'DISPONIBE';


        let existRoom = await Room.findOne({name: data.name});
        if(existRoom) {
            return res.send({message: 
                'Room already created'})
        }

        data.hotel = await Hotel.findOne({adminHotel: req.user.sub})


        let room = new Room(data);
        await room.save();
        return res.send({message: 'Room added sucessfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating room', error: err.message})
    }
}

exports.get = async(req, res)=>{
    try{
        let user = await Hotel.findOne({adminHotel: req.user.sub}) 

        let rooms = await Room.find({hotel:user})
        return res.send({message: 'Rooms found', rooms})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Rooms'})
    }
}

exports.getRoom = async(req, res)=>{
    try{   
        let user = await Hotel.findOne({adminHotel: req.user.sub})    
        let roomId = req.params.id;
        let room = await Room.findOne({_id: roomId , hotel:user})
        if(!room) return res.status(404).send({message: 'Room not found'});
        return res.send({message: 'Room found:', room});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Room'});
    }
}




exports.update = async(req, res)=>{
    try{

        let user = await Hotel.findOne({adminHotel: req.user.sub}) 
        let roomId = req.params.id;
        let data = req.body;

        if(data.hotel || Object.entries(data).length === 0) return res.status(400).send({message: 'Have submitted some data that cannot be updated'});
        
        let roomUpdate = await Room.findOneAndUpdate(
            {_id: roomId, hotel:user},
            data,
            {new: true} 
        )
        if(!roomUpdate) return res.status(404).send({message: 'Room not found and not updated'});
        return res.send({message: 'Room updated', roomUpdate})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error not updated', err: `Room ${err.keyValue.name} is already taken`});
    }
}




exports.delete = async(req, res)=>{
    try{
        let idRoom = req.params.id;
        let user = await Hotel.findOne({adminHotel: req.user.sub}) 
        let deletedRoom= await Room.findOneAndDelete({_id: idRoom, hotel:user});
        if(!deletedRoom) return res.status(404).send({message: 'Error removing  Room or already deleted'});
        return res.send({message: 'Room deleted sucessfully', deletedRoom});
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error removing room'})
    }
}