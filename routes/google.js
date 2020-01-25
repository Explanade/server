const router = require('express').Router()
const GoogleController = require('../controllers/google')

router.get('/places', GoogleController.getPlaces)

module.exports = router