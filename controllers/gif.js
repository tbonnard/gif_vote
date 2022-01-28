require('dotenv').config()
const axios = require('axios')
const { response } = require('express')
const jwt = require('jsonwebtoken')

const gifsRouter = require('express').Router()

const VoteGif = require('../models/voteGif')
const User = require('../models/user')
const VoteFame = require('../models/voteFame')


const api_key=process.env.API_KEY_GIF_DEV
const baseUrlGif=`https://api.giphy.com/v1/gifs/random?api_key=${api_key}`


gifsRouter.get('/cat/:category', async (request, response) => {
    const category = request.params.category
    let newUrl = `${baseUrlGif}&tag=${category}`
    console.log(newUrl)
    axios
    .get(newUrl)
    .then(res => {response.json(res.data)})
})

gifsRouter.get('/gif/:id', async (request, response) => {
    const idGif = request.params.id
    const baseUrlGifId=`https://api.giphy.com/v1/gifs/${idGif}?api_key=${api_key}`
    axios
    .get(baseUrlGifId)
    .then(res => {response.json(res.data)})
})


gifsRouter.post('/vote', async (request, response, next) =>{
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
            typeVote:body.typeVote,
            voter: userVoterGif,
            gifVoted:body.gifVotedId
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

        // const mostVotedUser = await MostVoted.findOne({user:userVoterGif})
        // if (mostVotedUser) {
        //     if(mostVotedUser.currentGifId === newVoteGifSaved.gifVoted ) {
        //         mostVotedUser.currentGifVote+=1
        //         const updatedMostVotedUser = await mostVotedUser.save()
        //         if (updatedMostVotedUser.currentGiftVote > updatedMostVotedUser.topGifVote) {
        //             updatedMostVotedUser.topGifVote = updatedMostVotedUser.currentGifVote
        //             updatedMostVotedUser.topGifId =updatedMostVotedUser.currentGifId
        //             await updatedMostVotedUser.save()
        //         }
        //     } else {
        //         mostVotedUser.currentGifVote=1
        //         mostVotedUser.currentGifId=newVoteGifSaved.gifVoted
        //         await mostVotedUser.save()
        //         }
        // } else {
        //     const newMostVoteGif = new MostVoted({
        //         user : userVoterGif,
        //         currentGifId : newVoteGif.gifVoted,
        //         currentGifVote : 1,
        //         topGifId :newVoteGif.gifVoted,
        //         topGifVote : 1
        //     })
        //     await newMostVoteGif.save()
        // }

        response.json(newVoteGifSaved)


    } catch(exception) {
        next(exception)
    }
})

module.exports = gifsRouter