require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')

const app = express()

// (pre)Middlewares
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Giffy API</h1>')
})

// Controllers
// app.use('/favs', favsRouter)
// app.use('/login', loginRouter)
// app.use('/register', registerRouter)

// (post)Middlewares

const PORT = process.env.PORT

// const server =
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
