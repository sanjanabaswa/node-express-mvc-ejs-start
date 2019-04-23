const mongoose = require('mongoose')

const PuppySchema = new mongoose.Schema({

  _id: { type: Number, required: true },
  name: {
    type: String,
    required: true,
    default: 'Lexie'
  },
  breed: {
    type: String,
    required: false,
    default: 'Cavachon'
  },
  age: {
    type: Number,
    required: false,
    default: 1
  },
  parents: {
    type: Array,
    required: false,
    default: [
      {
        parentName: 'Mom',
        parentBreed: 'Bichon Frise',
        parentAge: 5
      },
      {
        parentName: 'Dad',
        parentBreed: 'Cavalier King Charles',
        parentAge: 6
      }
    ]
  }
})
module.exports = mongoose.model('Puppy', PuppySchema)
