const { response } = require('express')
const votesGifRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const VoteGif = require('../models/voteGif')
const User = require('../models/user')
const VoteFame = require('../models/voteFame')
const Leaderboard = require('../models/leaderboard')

votesGifRouter.get('/', async (request, response) => {
    const allVotes = await VoteGif.find({})
    response.json(allVotes.map(vote => vote.toJSON()))
})


votesGifRouter.post('/challenge', async (request, response, next) =>{
    try {
        const body = request.body

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }
        
        const userVoterGif = await User.findById(request.user)

        const newVoteGif = new VoteGif({
            voter: userVoterGif,
            gifVoted:body.gifVotedId,
            typeVote:"ChallengeGame",
            urlEmbeddedGif:body.gifUrl
        })

        const newVoteGifSaved = await newVoteGif.save()
        userVoterGif.currentGifId = body.gifVotedId
        userVoterGif.save()

        const userVoteFame = await VoteFame.findOne({user:userVoterGif, GifId:newVoteGif.gifVoted})
        if (userVoteFame) {
            userVoteFame.GifTotalVote+=1
            await userVoteFame.save()
        } else {
            const newUserVoteFame = new VoteFame({
                user:userVoterGif,
                GifId:newVoteGif.gifVoted,
                urlEmbeddedGif: body.gifUrl
            })
            await newUserVoteFame.save()
        }

        response.json(newVoteGifSaved)


    } catch(exception) {
        next(exception)
    }
})


votesGifRouter.post('/duo', async (request, response, next) =>{
    try {
        const body = request.body
        let newVoteGif;

        if (body.token) {
            const decodedToken = jwt.verify(body.token, process.env.SECRET)
            request.user = decodedToken.id
            const userVoterGif = await User.findById(request.user)
            newVoteGif = new VoteGif({
                voter: userVoterGif,
                gifVoted:body.objectVotedDetails.gifVotedId,
                anonymous:false,
                urlEmbeddedGif:body.objectVotedDetails.gifUrl,
                gifCategory: body.objectVotedDetails.gifCategory
            })

        } else {
            newVoteGif = new VoteGif({
                gifVoted:body.objectVotedDetails.gifVotedId,
                anonymous:true,
                urlEmbeddedGif:body.objectVotedDetails.gifUrl,
                gifCategory: body.objectVotedDetails.gifCategory
            })
        }

        const newVoteGifSaved = newVoteGif.save()

        const leaderboardGif = await Leaderboard.findOne({GifId:body.objectVotedDetails.gifVotedId})
        if (leaderboardGif) {
            leaderboardGif.GifTotalVote +=1
            await leaderboardGif.save()
        } else {
            const newLeaderboardGif = new Leaderboard({
                GifId : body.objectVotedDetails.gifVotedId,
                urlEmbeddedGif: body.objectVotedDetails.gifUrl,
                gifCategory: body.objectVotedDetails.gifCategory
            })
            await newLeaderboardGif.save()
        }

        response.json(newVoteGifSaved)
    }
    catch(exception) {
        next(exception)
    }

})

module.exports = votesGifRouter
