const router = require('express').Router()
const ItineraryController = require('../controllers/itinerary')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', ItineraryController.create)
router.get('/', ItineraryController.getItineraries)
router.get('/:id', ItineraryController.getOneItinerary)
// router.patch('/:id/add-activity', ItineraryController.addActivity)
// router.patch('/:id/remove-activity', ItineraryController.removeActivity)
// router.patch('/:id/write-review', ItineraryController.writeReview)
router.use(authorization)
router.delete('/:id', ItineraryController.deleteItinerary)

module.exports = router