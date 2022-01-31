require('dotenv').config()
const axios = require('axios')
const { response } = require('express')

const leaderboardRouter = require('express').Router()
const Leaderboard = require('../models/leaderboard')
const VoteGif = require('../models/voteGif')


leaderboardRouter.get('/', async (request, response) => {
    const currentDate = new Date()
    const weekly = (24*60*60*1000) * 7
    const daily = (24*60*60*1000)

    const globalLeaderboardScores = await Leaderboard.find({})

    const allVoteGifs = await VoteGif.find({typeVote:"DuoGame"})

    const weeklyLeaderboardScores = allVoteGifs.filter(score => score.date_created >= currentDate-weekly)
    const dailyLeaderboardScores = allVoteGifs.filter(score => score.date_created >= currentDate-daily)

    let week = []

    for (let i in weeklyLeaderboardScores) {
        let toCreate=true
        for (let j in week) {
            if (weeklyLeaderboardScores[i].gifVoted == week[j].GifId) {
                week[j]['GifTotalVote']  +=1
                toCreate=false
            } 
        } if (toCreate) {
            const newItem = {
                typeVote: 'DuoGame',
                GifId: weeklyLeaderboardScores[i].gifVoted,
                urlEmbeddedGif:weeklyLeaderboardScores[i].urlEmbeddedGif,
                gifCategory:weeklyLeaderboardScores[i].gifCategory,
                GifTotalVote: 1
            }
            week.push(newItem)
         }
        }

        let day = []

        for (let i in dailyLeaderboardScores) {
            let toCreate=true
            for (let j in day) {
                if (dailyLeaderboardScores[i].gifVoted == day[j].GifId) {
                    day[j]['GifTotalVote']  +=1
                    toCreate=false
                } 
            } if (toCreate) {
                const newItem = {
                    typeVote: 'DuoGame',
                    GifId: dailyLeaderboardScores[i].gifVoted,
                    urlEmbeddedGif:dailyLeaderboardScores[i].urlEmbeddedGif,
                    gifCategory:dailyLeaderboardScores[i].gifCategory,
                    GifTotalVote: 1
                }
                day.push(newItem)
             }
            }

    const allLeaderboardScores = {all:globalLeaderboardScores.sort(function(a, b) {return b.GifTotalVote - a.GifTotalVote}).slice(0,10), weekly:week.sort(function(a, b) {return b.GifTotalVote - a.GifTotalVote}).slice(0,10), daily:day.sort(function(a, b) {return b.GifTotalVote - a.GifTotalVote}).slice(0,10)}
    response.json(allLeaderboardScores)
})


module.exports = leaderboardRouter