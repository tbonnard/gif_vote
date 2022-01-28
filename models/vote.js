const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    typeVote: {
        type: String,
        default: "like"
      },
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
    itemVoted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
        },
    date_created: {
        type: Date,
        default: new Date()
      }
})

voteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Vote', voteSchema)
