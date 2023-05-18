'use strict'

const Event = require('./event.model');
const Type = require('../type/type.model');

exports.testEvent = (req, res) => {
    res.send({ message: 'Test function' });
}

exports.addEvent = async(req, res)=>{
    try{
        let data = req.body;
        let existEvent = await Event.findOne({date: data.date});
        if(existEvent) {
            return res.send({message: 'Event already created'})
        }
        let event = new Event(data);
        await event.save();
        return res.status(201).send({message: 'Created Event'})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error saving Event'})
    }
}

exports.getEvent = async(req, res)=>{
    try{
        let event = await Event.find();
        return res.send({message: 'Event found', event});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Event'});
    }
}

exports.getevent = async(req, res)=>{
    try{
        let eventId = req.params.id;
        let event = await Event.findOne({_id: eventId}).populate('type');
        if(!event) return res.status(404).send({message: 'Event not found'});
        return res.send({message: 'Event found:', event});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting Event'});
    }
}

exports.updateEvent = async(req, res)=>{
    try{
        let eventid = req.params.id;
        let data = req.body;
        let existType = await Type.findOne({_id: data.type});
        if(!existType) return res.status(404).send({message: 'Type not found'});
        let updatedEvent = await Event.findOneAndUpdate(
            {_id: eventid},
            data,
            {new: true}
        )
        if(!updatedEvent) return res.send({message: 'Product not found and not updated'});
        return res.send({message: 'Product updated:', updatedEvent});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error updating product'});
    }
}

exports.deleteEvent = async(req,res)=>{
    try {
        let eventid = req.params.id
        let deletedEvent = await Event.findOneAndDelete({_id: eventid})
        if(deletedEvent) return res.send({message:'Event deleted sucessfully', deletedEvent})
        return res.status(404).send({message:'Event not found and not deleted'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({message:'Error deleting event'})
    }
}