const Book = require('../models/book')
//const Game = require('../models/game')
//const Movie = require('../models/movie')
const { StatusCodes } = require('http-status-codes')
//const { BadRequestError, NotFoundError } = require('../errors')

const getAllFictions = async (req, res) => {
    //const fictions = await Book.find({ createdBy: req.user.userId }).sort('createdAt')
    const fictions = await Book.find().sort('createdAt')
    res.status(StatusCodes.OK).json({ fictions, count: fictions.length })
}

const getFiction = async (req, res) => {

}

const createFiction = async (req, res) => {
    //req.body.createdBy = req.user.userId    after auth
    const fiction = await Book.create(req.body)
    res.status(StatusCodes.CREATED).json({ fiction })
}

const updateFiction = async (req, res) => {

}

const deleteFiction = async (req, res) => {

}

module.exports = {
    createFiction,
    deleteFiction,
    getAllFictions,
    updateFiction,
    getFiction,
}