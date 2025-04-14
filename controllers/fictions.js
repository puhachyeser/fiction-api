const Fiction = require('../models/Fiction')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getModelType = (req) => {
    const { type } = req.body;
    let Model;

    switch (type) {
    case 'book':
        Model = Fiction.discriminators.book;
        break;
    case 'movie':
        Model = Fiction.discriminators.movie;
        break;
    case 'game':
        Model = Fiction.discriminators.game;
        break;
    default:
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid type' });
    }
    return Model;
}

const getAllFictions = async (req, res) => {
    const fictions = await Fiction.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ fictions, count: fictions.length })
}

const getFiction = async (req, res) => {
    const {
        user: { userId },
        params: { id: fictionId },
      } = req

    const fiction = await Fiction.findOne({createdBy: userId, _id: fictionId})
    if (!fiction) {
        res.status(StatusCodes.NOT_FOUND).json("not found error")
        throw new NotFoundError(`No fiction with id ${fictionId}`)
    }
    res.status(StatusCodes.OK).json({ fiction })
}

const createFiction = async (req, res) => {
    req.body.createdBy = req.user.userId
    let Model = getModelType(req)
    const fiction = await Model.create(req.body)
    res.status(StatusCodes.CREATED).json({ fiction })
}

const updateFiction = async (req, res) => {
    const {
        user: { userId },
        params: { id: fictionId },
      } = req
    let Model = getModelType(req)

    const fiction = await Model.findOneAndUpdate({_id: fictionId, createdBy: userId}, req.body, { new: true, runValidators: true })
    if (!fiction) {
        res.status(StatusCodes.NOT_FOUND).json("not found error")
        throw new NotFoundError(`No fiction with id ${fictionId}`)
    }
    res.status(StatusCodes.OK).json({ fiction })
}

const deleteFiction = async (req, res) => {
    const { params: { id: fictionId }} = req

    const fiction = await Fiction.findOneAndDelete({_id: fictionId})
    if (!fiction) {
        res.status(StatusCodes.NOT_FOUND).json("not found error")
        throw new NotFoundError(`No fiction with id ${fictionId}`)
    }
    res.status(StatusCodes.OK).send()
}

const getFictionByType = async (req, res) => {
    const { params: { type: fictionType }} = req

    const modelNames = Object.values(Fiction.discriminators).map(model => model.modelName)
    if (!modelNames.includes(`${fictionType}`)) {
        throw new NotFoundError(`Fiction type ${fictionType} does not exist`)
    }
    
    const fictions = await Fiction.find({ createdBy: req.user.userId, type: fictionType }).sort('createdAt')
    res.status(StatusCodes.OK).json({ fictions, count: fictions.length })
}

module.exports = {
    createFiction,
    deleteFiction,
    getAllFictions,
    updateFiction,
    getFiction,
    getFictionByType
}