const express = require('express')

const router = express.Router()

const {
  createFiction,
  deleteFiction,
  getAllFictions,
  updateFiction,
  getFiction,
} = require('../controllers/fictions')

router.route('/').post(createFiction).get(getAllFictions)

router.route('/:id').get(getFiction).delete(deleteFiction).patch(updateFiction)

module.exports = router