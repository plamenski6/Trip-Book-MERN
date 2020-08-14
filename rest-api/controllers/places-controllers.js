const { validationResult } = require('express-validator')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')
const Place = require('../models/place')
const User = require('../models/user')

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid
  let place

  try {
    place = await Place.findById(placeId)
  } catch (err) {
    const error = new HttpError('Something went wrong, could not find a place', 500)
    return next(error)
  }

  if (!place) {
    const error = new HttpError('Could not find a place for the provided id.', 404)
    return next(error)
  }

  res.json({ place: place.toObject({ getters: true }) })
}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid
  let userWithPlaces

  try {
    userWithPlaces = await User.findById(userId).populate('places')
  } catch (err) {
    const error = new HttpError('Fetching places failed', 500)
    return next(error)
  }

  if (!userWithPlaces.places || userWithPlaces.places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    )
  }

  res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) })
}

const createPlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }

  const { title, description, address, image, creator } = req.body

  const createdPlace = new Place({
    title,
    description,
    image,
    address,
    creator
  })

  let user
  try {
    user = await User.findById(creator)
  } catch (err) {
    const error = new HttpError('Creating place failed.', 500)
    return next(error)
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404)
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdPlace.save({ session: sess })
    user.places.push(createdPlace)
    await user.save({ session: sess })
    await sess.commitTransaction()

  } catch (err) {
    const error = new HttpError('Creating place failed.', 500)
    return next(error)
  }

  res.status(201).json({ place: createdPlace.toObject({ getters: true }) })
}

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed, please check your data.', 422)
    return next(error)
  }

  const { title, description } = req.body
  const placeId = req.params.pid
  let place

  try {
    place = await Place.findById(placeId)
  } catch (err) {
    const error = new HttpError('Updating place failed', 500)
    return next(error)
  }

  if (place.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this place.', 401)
    return next(error)
  }

  place.title = title
  place.description = description

  try {
    await place.save()
  } catch (err) {
    const error = new HttpError('Could not update place', 500)
    return next(error)
  }

  res.status(200).json({ place: place.toObject({ getters: true }) })
}

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid
  let place

  try {
    place = await Place.findById(placeId).populate('creator')
  } catch (err) {
    const error = new HttpError('Could not delete place', 500)
    return next(error)
  }

  if (!place) {
    const error = new HttpError('Could not find place with this id', 404)
    return next(error)
  }

  if (place.creator.id !== req.userData.userId) {
    const error = new HttpError('You are not allowed to delete this place.', 401)
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await place.remove({ session: sess })
    place.creator.places.pull(place)
    await place.creator.save({ session: sess })
    await sess.commitTransaction()

  } catch (err) {
    const error = new HttpError('Could not delete place', 500)
    return next(error)
  }

  res.status(200).json({ message: 'Deleted place.' })
}

exports.getPlaceById = getPlaceById
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace
