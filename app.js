const config = require('./utils/config')
const express = require('express')
const path = require('path');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/user')
// const itemsRouter = require('./controllers/item')
const votesRouter = require('./controllers/vote')
const gifsRouter = require('./controllers/gif')
const voteFameRouter = require('./controllers/voteFame')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
//app.use(express.static('build'))
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
//app.use(middleware.userExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
// app.use('/api/items', itemsRouter)
app.use('/api/votes', votesRouter)
app.use('/api/gifs', gifsRouter)
app.use('/api/fame', voteFameRouter)


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app