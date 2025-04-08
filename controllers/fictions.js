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
    const { params: { id: fictionId }} = req

    const fiction = await Book.findOne({_id: fictionId})
    if (!fiction) {
        res.status(StatusCodes.NOT_FOUND).json("not found error")
        //throw new NotFoundError(`No fiction with id ${fictionId}`)
    }
    res.status(StatusCodes.OK).json({ fiction })
}

const createFiction = async (req, res) => {
    //req.body.createdBy = req.user.userId    after auth
    const fiction = await Book.create(req.body)
    res.status(StatusCodes.CREATED).json({ fiction })
}

const updateFiction = async (req, res) => {
    const { params: { id: fictionId }} = req
    // TODO: discriminator for different type of models. All models in one file Fiction.js

    const fiction = await Book.findOneAndUpdate({_id: fictionId}, req.body, { new: true, runValidators: true })
    if (!fiction) {
        res.status(StatusCodes.NOT_FOUND).json("not found error")
        //throw new NotFoundError(`No fiction with id ${fictionId}`)
    }
    res.status(StatusCodes.OK).json({ fiction })
}

const deleteFiction = async (req, res) => {
    const { params: { id: fictionId }} = req

    const fiction = await Book.findOneAndDelete({_id: fictionId})
    if (!fiction) {
        res.status(StatusCodes.NOT_FOUND).json("not found error")
        //throw new NotFoundError(`No fiction with id ${fictionId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    createFiction,
    deleteFiction,
    getAllFictions,
    updateFiction,
    getFiction,
}