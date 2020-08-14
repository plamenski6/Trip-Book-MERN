const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

  const { name, email, password, image } = req.body

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

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 10)
  } catch (err) {
    const error = new HttpError('Could not create user, please try again.', 500)
    return next(error)
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image,
    places: []
  })

  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpError('Creating user failed.', 500)
    return next(error)
  }

  let token
  token = jwt.sign(
    { userId: createdUser.id, email: createdUser.email },
    process.env.JWT_KEY,
    { expiresIn: '1h' }
  )

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token })
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


  if (!existingUser) {
    const error = new HttpError('Invalid credentials, could not log in.', 401)
    return next(error)
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch (err) {
    const error = new HttpError('Could not log in, please try again.', 500)
    return next(error)
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid credentials, could not log in.', 401)
    return next(error)
  }

  let token
  token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    process.env.JWT_KEY,
    { expiresIn: '1h' }
  )

  res.json({ userId: existingUser.id, email: existingUser.email, token })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
