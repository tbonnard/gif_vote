require('dotenv').config()
const { response } = require('express')
const jwt = require('jsonwebtoken')

const voteFameRouter = require('express').Router()

const VoteFame = require('../models/voteFame')
const User = require('../models/user')

voteFameRouter.get('/', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }

        const userFound = await User.findById(request.user)
        
        const votesFameUser = await VoteFame.find({user : userFound})
        if (votesFameUser) {
            response.json(votesFameUser.map(voteFameUser => voteFameUser.toJSON()).sort(function(a, b) {return b.GifTotalVote - a.GifTotalVote}).slice(0,10))
        } 

    } catch(exception) {
        next(exception)
    }
})

module.exports = voteFameRouter