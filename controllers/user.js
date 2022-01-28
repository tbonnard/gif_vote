const bcrypt = require('bcrypt')
const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const usersRouter = require('express').Router()

const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
})

usersRouter.get('/validate_username/:username', async (request, response, next) => {
    try {
        const checkUsername = await User.find({username:request.params.username})
        if (checkUsername.length>0) {
            return response.status(200).json({message: 'invalid username'})
        } else {
            return response.status(200).json({message: 'username available'})
        }
    } catch(exception) {
        next(exception)
    }
})

usersRouter.get('/current', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }
    
        const userCurrentGifId = await User.findById(request.user)
        response.json(userCurrentGifId.currentGifId)

    } catch(exception) {
        next(exception)
    }
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const userUsername = await User.findOne({ username: body.username }) 
        //const useEmail = await User.findOne({ username: body.username }) 
        if (userUsername) {
            return response.status(401).json({error: 'username taken'})
        }

        if (body.username.length === 0 || body.password.length === 0 || body.confirmPassword.length === 0) {
            return response.status(401).json({error: 'invalid username or password'})
        }

        if (body.confirmPassword !== body.password) {
            return response.status(401).json({error: 'passwords do not match'})
        }
    
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds) 
    
        // const validateEmail = (email) => {
        //     return String(email)
        //       .toLowerCase()
        //       .match(
        //         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //       );
        //   };

        // emailConfirmed = validateEmail(body.email)
        // if (!emailConfirmed) {
        //     return response.status(401).json({error: 'invalid email'})
        // }

        const user = new User({
            username: body.username, 
            name: body.name,
            passwordHash: passwordHash,
        })
    
        const savedUser = await user.save()

        response.json(savedUser.toJSON())


    } catch (exception) {
        next(exception)
    }

})

usersRouter.post('/change_gif', async (request, response, next) => {
    try {
        const body = request.body

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        } else {
          request.user = decodedToken.id
        }

        const user = await User.findById(request.user)
        user.currentGifId = body.gifId
        const userCurrentGifUpdated = await user.save()
        response.json(userCurrentGifUpdated.toJSON())

    } catch(exception) {
        next(exception)
    }
})


module.exports = usersRouter