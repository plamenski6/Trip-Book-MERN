const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const User = require('../models/user')

const getUsers = async (req, res, next) => {
  let users

  try {
    users = await User.find({}, '-password')
  } catch (err) {
    const error = new HttpError('Fetching users failed', 500)
    return next(error)
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) })
}

const signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new HttpError('Invalid inputs passed, please check your data.', 422)
    return next(error)
  }

  const { name, email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError('Signing up failed.', 500)
    return next(error)
  }

  if (existingUser) {
    const error = new HttpError('It has already a user with this email.', 422)
    return next(error)
  }

  const createdUser = new User({
    name,
    email,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Person_icon_BLACK-01.svg/564px-Person_icon_BLACK-01.svg.png',
    password,
    places: []
  })

  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpError('Creating user failed.', 500)
    return next(error)
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) })
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError('Logging in failed.', 500)
    return next(error)
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError('Invalid credentials, could not log in.', 401)
    return next(error)
  }

  res.json({ message: 'Logged in!' })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
