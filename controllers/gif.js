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


module.exports = gifsRouter