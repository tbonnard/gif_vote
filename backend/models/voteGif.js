const mongoose = require('mongoose')

const voteGifSchema = new mongoose.Schema({
    typeVote: {
        type: String,
        default: "DuoGame"
      },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
    gifVoted: {
        type: String,
        required: true
      },
    urlEmbeddedGif: {
      type: String,
      required: true
    },
    date_created: {
        type: Date,
        default: new Date()
      },
    anonymous: {
      type: Boolean,
      default: false
    },
    gifCategory: {type: String}
})

voteGifSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('VoteGif', voteGifSchema)
