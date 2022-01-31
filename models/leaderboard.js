const mongoose = require('mongoose')

const leaderboardSchema = new mongoose.Schema({
    typeVote: {
        type: String,
        default: "DuoGame"
    },
    GifId : {type: String, required:true},
    GifTotalVote : {type: Number, default:1},
    urlEmbeddedGif: {
      type: String,
      required: true
    },
    date_created: {
        type: Date,
        default: new Date()
      },
    gifCategory: {type: String}
})

leaderboardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Leaderboard', leaderboardSchema)
