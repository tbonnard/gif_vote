const { response } = require('express')
const votesRouter = require('express').Router()

const Vote = require('../models/vote')

votesRouter.get('/', async (request, response) => {
    const allVotes = await Vote.find({})
    response.json(allVotes.map(vote => vote.toJSON()))
})

module.exports = votesRouter
