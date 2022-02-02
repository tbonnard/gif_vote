// const mongoose = require('mongoose')

// const itemSchema = new mongoose.Schema({
//     content: { type: String, required: true, minLength: 1 },
//     creator: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//         },
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
//     }
// })

// itemSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//       returnedObject.id = returnedObject._id.toString()
//       delete returnedObject._id
//       delete returnedObject.__v
//     }
//   })

// module.exports = mongoose.model('Item', itemSchema)
