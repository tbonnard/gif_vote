// const mongoose = require('mongoose')

// const gifSchema = new mongoose.Schema({
//     date_created: {
//         type: Date,
//         default: new Date()
//       },
//     likes: {
//       type: Number,
//       default:0
//     },
//     dislikes: {
//       type: Number,
//       default:0
//     },
//     idGif: {
//       type: String,
//       required: true
//     },
//     urlEmbeddedGif: {
//       type: String,
//       required: true
//     }
// })

// gifSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
//   })

// module.exports = mongoose.model('Gif', gifSchema)
