const mongoose = require('mongoose')

const VoteFame = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
    GifId : {type: String, required:true},
    GifTotalVote : {type: Number, default:1},
    date_created: {
      type: Date,
      default: new Date()
    },
    urlEmbeddedGif: {
      type: String,
      required: true
    }
})

VoteFame.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })
  

module.exports = mongoose.model('VoteFame', VoteFame)