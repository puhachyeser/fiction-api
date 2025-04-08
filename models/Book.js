const { date } = require('joi')
const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      maxlength: 30,
    },
    author: {
      type: String,
      required: [true, 'Please provide author'],
      maxlength: 30,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: 100
    },
    realeaseYear: {
        type: Number,
        required: [true, 'Please realease year'],
        minLength: 4,
        maxLength: 4
    },
    /*
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    */
  },
  { timestamps: true }
)

module.exports = mongoose.model('Book', BookSchema)