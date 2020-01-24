const router = require('express').Router()
const ItineraryController = require('../controllers/itinerary')

router.post('/', ItineraryController.create)

module.exports = router