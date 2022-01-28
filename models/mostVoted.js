const mongoose = require('mongoose')

const MostVotedSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
    currentGifId : {type: String, default:''},
    currentGifVote : {type: Number,default:0},
    topGifId : {type: String,default:''},
    topGifVote : {type: Number,default:0},
    date_created: {
      type: Date,
      default: new Date()
    }
})

MostVotedSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })
  

module.exports = mongoose.model('MostVoted', MostVotedSchema)