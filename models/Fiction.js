const { date } = require('joi')
const mongoose = require('mongoose')

const BaseFictionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title'],
        maxlength: 30,
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        maxlength: 100
    },
    releaseYear: {
        type: Number,
        required: [true, 'Please provide release year'],
        maxlength: 4,
        validate: /^[12][0-9]{3}$/
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    }, { timestamps: true, discriminatorKey: 'type', collection: 'fictions' });
  
const Fiction = mongoose.model('Fiction', BaseFictionSchema);

const Book = Fiction.discriminator('book', new mongoose.Schema({
    author: {
        type: String,
        required: [true, 'Please provide author'],
        maxlength: 30,
    },
    pages: {
        type: Number,
        required: [true, 'Please provide number of pages'],
        maxlength: 3,
    }
}));

const Movie = Fiction.discriminator('movie', new mongoose.Schema({
    director: {
        type: String,
        required: [true, 'Please provide director'],
        maxlength: 30,
    },
    duration: {
        type: String,
        required: [true, 'Please provide number of pages'],
        maxlength: 10,
        validate: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
    }
}));

const Game = Fiction.discriminator('game', new mongoose.Schema({
    studio: {
        type: String,
        required: [true, 'Please provide studio'],
        maxlength: 30,
    },
    timeToBeat: {
        type: String,
        required: [true, 'Please provide time to beat'],
        maxlength: 10,
        validate: /^\d+(\.\d+)?h$/
    }
}));

/*
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)
*/
module.exports = mongoose.model('Fiction', BaseFictionSchema)