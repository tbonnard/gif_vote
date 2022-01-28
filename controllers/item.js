// const { response } = require('express')
// const itemsRouter = require('express').Router()
// const jwt = require('jsonwebtoken')

// const Item = require('../models/item')
// const User = require('../models/user')
// const Vote = require('../models/vote')

// itemsRouter.get('/delete', async (request, response) => {
//     await Item.deleteMany({})
//     await Vote.deleteMany({})
//     return response.status(204).end()
// })


// itemsRouter.get('/', async (request, response) => {
//     const allItems = await Item.find({})
//     response.json(allItems.map(item => item.toJSON()))
// })

// itemsRouter.get('/random', async (request, response) => {
//     const allItems = await Item.find({})
//     if (allItems.length > 0) {
//         response.json(allItems[Math.floor(Math.random()*allItems.length)].toJSON())
//     } else {
//         return response.status(204).end()
//     }
// })

// itemsRouter.get('/item/:id', async (request, response) => {
//     const itemFound = await Item.findById(request.params.id)
//     response.json(itemFound.toJSON())
// })

// itemsRouter.post('/', async (request, response, next) => {
//     try {
        
//         const body = request.body

//         const decodedToken = jwt.verify(request.token, process.env.SECRET)
//         if (!decodedToken.id) {
//           return response.status(401).json({ error: 'token missing or invalid' })
//         } else {
//           request.user = decodedToken.id
//         }
        
//         const user = await User.findById(request.user)

//         const newItem = new Item ({
//             content: body.content,
//             creator: user,
//         })

//         const newItemSaved = await newItem.save()
//         user.items = user.items.concat(newItemSaved._id)
//         await user.save()
//         response.json(newItemSaved)

//     } catch(exception) {
//         next(exception)
//     }
// })

// itemsRouter.post('/vote', async (request, response, next) => {
//     try {
//         const body = request.body

//         const itemVoted = await Item.findById(body.itemId)

//         const decodedToken = jwt.verify(request.token, process.env.SECRET)
//         if (!decodedToken.id) {
//           return response.status(401).json({ error: 'token missing or invalid' })
//         } else {
//           request.user = decodedToken.id
//         }
        
//         const userVoter = await User.findById(request.user)

//         const newVote = new Vote({
//             typeVote:body.typeVote,
//             voter: userVoter,
//             itemVoted:itemVoted    
//         })

//         const newVoteSaved = await newVote.save()
        
//         const itemVotedUserCreator = await User.findById(itemVoted.creator)

//         if (newVoteSaved.typeVote === 'like') {
//             itemVoted.likes+=1
//             await itemVoted.save()
//             itemVotedUserCreator.points_top_items+=1
//             await itemVotedUserCreator.save()
//         } else if (newVoteSaved.typeVote === 'dislike') {
//             itemVoted.dislikes+=1
//             await itemVoted.save()
//             itemVotedUserCreator.points_bad_items+=1
//             await itemVotedUserCreator.save()
//         }

//         userVoter.points_voter +=1
//         await userVoter.save()

//         response.json(newVoteSaved)

//     } catch(exception) {
//         next(exception)
//     }
// })



// module.exports = itemsRouter
