const uuid = require("uuid/v4");
const { validatorResult } = require("express-validator");
const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
  {
    id: "P1",
    title: "Ojuelegba",
    description: " Adubo, a rough place",
    location: {
      lat: 40.7487593,
      lng: -73.5683957,
    },
    address: "Brown Road Ojuelegba Lagos Nigeria",
    creator: "u1",
  },
];

exports.getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return (p.id = placeId);
  });

  if (!place) {
    throw new httpError("Could not find place for the provided id", 404);
  }
  res.json({ place });
};

exports.getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided id", 404)
    );
  }

  res.json(places);
};

exports.createPlace = (req, res, next) => {
  const errors = validatorResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({
    place: createdPlace,
  });
};

exports.updatePlaceById = (req, res, next) => {
  const errors = validatorResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatePlace.title = title;
  updatePlace.description = description;

  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({
    place: updatePlaceById,
  });
};

exports.deletePlaceById = (req, res, next) => {
  placeId = req.params.pid;
  if (DUMMY_PLACES.find((p) => p.id === placeId))
    throw new HttpError("could not find a place for that id", 404);
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({
    msg: "Deleted Place",
  });
};
