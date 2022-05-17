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
favsRouter.post('/:id', userExtractor, async (request, response) => {
  const { id } = request.params
  const { userId } = request

  // Add id format verification
  if (!id) {
    return response.status(400).json({
      error: 'gif id missing'
    })
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { favorites: id } },
      { new: true }
    )
    console.log(updatedUser)
    response.json(updatedUser.favorites)
  } catch (error) {
    console.log(error)
  }
})

// ✅ Delete note from favs
favsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { id } = request.params
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
    response.json(updatedUser.favorites)
  } catch (error) {
    console.log(error)
  }
})

module.exports = favsRouter

// Before post or delete, see if the id is already in use.
// It doesn't affect the response currently
