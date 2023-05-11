"use strict";

const Hotel = require("./hotel.model");
const User = require("../user/user.model");
const userInfo = ["name", "username"];
const { validateData } = require('../utils/validate.js')

exports.test = (req, res) => {
  res.send({ message: "Funcion de prueba" });
};

exports.addHotel = async (req, res) => {
  try {
    let data = req.body;
    //Validar que no exista duplicados
    let existHot = await Hotel.findOne({ name: data.name });
    let existAd = await Hotel.findOne({ adminHotel: data.adminHotel });
    if (existHot) return res.status(404).send({ message: "Existing hotel" });
    if (existAd)
      return res
        .status(404)
        .send({ message: "El usuario ya administra un hotel" });
    let hotel = new Hotel(data);
    await hotel.save();
    return res.send({ message: "Hotel created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error creating hotel" });
  }
};

exports.getHotels = async (req, res) => {
  try {
    let hotels = await Hotel.find().populate("adminHotel", userInfo);
    return res.send({ message: "Hoteles found", hotels });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error getting Hotels" });
  }
};

exports.getHotel = async (req, res) => {
  try {
    let hotelId = req.params.id;
    let hotel = await Hotel.findOne({ _id: hotelId }).populate(
      "adminHotel",
      userInfo
    );
    if (!hotel) return res.status(404).send({ message: "Hotel not found" });
    return res.send({ message: "Hotel found: ", hotel });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error getting Hotel" });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    let data = req.body;
    let hotelId = req.params.id;
    //Validar que no venga el admin del hotel
    if (data.adminHotel)
      return res.status(400).send({ message: "Some params are not aceptend" });
    let updateHotel = await Hotel.findByIdAndUpdate({ _id: hotelId }, data, {
      new: true,
    });
    if (!updateHotel) return res.send({ message: "Hotel not found" });
    return res.send({ message: "Hotel updated sucessfylly", updateHotel });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error update Hotel" });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    let idHotel = req.params.id;
    let deleteHotel = await Hotel.findOneAndDelete({ _id: idHotel });
    if (!deleteHotel)
      return res
        .status(404)
        .send({ message: "Error removing hotel or already deleted" });
    return res.send({
      message: "Hotel deleted successfully",
      deleteHotel: deleteHotel,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error deleting Hotel" });
  }
};

exports.search = async (req, res) => {
  try {
    let params = {
      search: req.body.search,
    };
    let validate = validateData(params);
    if(!validate){
        /* let hotel = await Hotel.find({
            location: {
              $regex: params2.location,
              $options: "i",
            },
          }) */
          let searchResult = await Hotel.find({
            $or: [
                {
                    name: { $regex: params.search, $options: 'i'},
                },
                {
                    location: { $regex: params.search, $options: 'i'}
                }
            ]
          });
          return res.send({ searchResult })
    }
    if (validate) return res.status(400).send(validate);
    return res.send({ searchResult });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error searching hotel" });
  }
};
