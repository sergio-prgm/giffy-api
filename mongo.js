const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log('Database connected')
  }).catch(error => {
    console.error(error)
  })

  process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
  })