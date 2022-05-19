require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()

const favsRouter = require('./controllers/favs')
const loginRouter = require('./controllers/login')
const registerRouter = require('./controllers/register')

const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')

// (pre)Middlewares
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Giffy API</h1>')
})

// Controllers
app.use('/api/favs', favsRouter)
app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)

// (post)Middlewares
app.use(handleErrors)
app.use(notFound)

const PORT = process.env.PORT || 3000

// const server =
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
