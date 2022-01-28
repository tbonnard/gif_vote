const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    //unique: true,
    required:true,
    minLength: 2
  },
  // email: { 
  //   type: String,
  //   //unique: true,
  //   required:true,
  // },
  passwordHash: { 
    type: String,
    required:true,
    minLength: 4
  },
  name: {type: String },
  items :[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
    }],
  date_created: {
    type: Date,
    default: new Date()
  },
  points_voter: { type: Number, default:0},
  points_sharer: { type: Number, default:0},
  points_top_items: { type: Number, default:0},
  points_bad_items: { type: Number, default:0},
  active: {
    type: Boolean,
    default: true
  },
  currentGifId : {type: String, default:''}
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
  })
  
//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)
