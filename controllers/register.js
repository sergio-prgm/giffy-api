const registerRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// registerRouter.get('/', async (request, response) => {
//   const users = await User.find({}).populate()
// })

registerRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    passwordHash
  })

  console.log(user)
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json(error)
  }
})

module.exports = registerRouter
