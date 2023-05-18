'use strict'

const Type = require('./type.model');
const Event = require('../event/event.model');

exports.testType = (req, res) => {
    res.send({ message: 'Test function' });
}

exports.defaultType = async()=>{
    try{
        let data = {
            name: 'Boda',
            description: 'Fiesta Casamiento'
        }
        let existType = await Type.findOne({name: 'Boda'});
        if(existType) return console.log('Default Event Type already createad');
        let defType = new Type(data);
        await defType.save();
        return console.log('Default Event Type created');
    }catch(err){
        return console.error(err);
    }
}

exports.addType = async(req, res)=>{ 
    try{
        let data = req.body;
        let existType = await Type.findOne({name: data.name});
        if(existType) {
            return res.sed({message: 'Type Event already created'})
        }
        let type = new Type(data);
        await type.save();
        return res.status(201).send({message: 'Created Event Type'})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error saving Event Type'})
    }
}

exports.getTypes = async(req, res)=>{
    try{
        let types = await Type.find();
        return res.send({message: 'Event Type found', types})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Event Type'});
    }
}

exports.getType = async(req, res)=>{
    try{
        let typeId = req.params.id;
        let type = await type.findOne({_id: typeId});
        if(!type) return res.status(404).send({message: 'Event Type not found'});
        return res.send({message: 'Event Type found', type})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Event Type'});
    }
}

exports.deleteType = async(req, res)=>{
    try{
        let IdType = req.params.id;
        let DeletedType = await Type.findOneAndDelete({_id: IdType});
        if(!DeletedType) return res.send({message: 'Event type not found and not deleted'});
        return res.send({message: `Event type successfully removed`});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error deleting event type'});
    }
}