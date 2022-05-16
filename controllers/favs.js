const favsRouter = require('express').Router()
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')

// Retrieve favs from user
favsRouter.get('/', userExtractor, async (request, response) => {
  const { userId } = request

  const user = await User.findById({ _id: userId })
  response.json(user.favorites)
})

// ✅ Add note to favorites
favsRouter.post('/', userExtractor, async (request, response) => {
  const { id } = request.body
  const { userId } = request

  if (!id) {
    return response.status(400).json({
      error: 'gif id missing'
    })
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { favorites: id } },
      { new: true }
    )
    console.log(updatedUser)
  } catch (error) {
    console.log(error)
  }
})

// ✅ Delete note from favs
favsRouter.delete('/', userExtractor, async (request, response) => {
  const { id } = request.body
  const { userId } = request

  if (!id) {
    return response.status(400).json({
      error: 'gif id missing'
    })
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { favorites: id } },
      { new: true }
    )
    console.log(updatedUser)
  } catch (error) {
    console.log(error)
  }
})

module.exports = favsRouter
