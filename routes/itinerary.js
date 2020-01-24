const router = require('express').Router()
const ItineraryController = require('../controllers/itinerary')

router.post('/', ItineraryController.create)
router.get('/', ItineraryController.getItineraries)
router.get('/:id', ItineraryController.getOneItinerary)
router.patch('/:id/add-activity', ItineraryController.addActivity)
router.patch('/:id/remove-activity', ItineraryController.removeActivity)
router.patch('/:id/write-review', ItineraryController.writeReview)

module.exports = router