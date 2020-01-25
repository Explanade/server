const router = require('express').Router()
const ItineraryController = require('../controllers/itinerary')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', ItineraryController.getItineraries)
router.get('/:id', ItineraryController.getOneItinerary)
// router.use(authentication)
router.post('/', authentication, ItineraryController.create)
router.put('/:id', authentication, authorization, ItineraryController.updateItinerary)
// router.patch('/:id/add-activity', ItineraryController.addActivity)
// router.patch('/:id/remove-activity', ItineraryController.removeActivity)
// router.patch('/:id/write-review', ItineraryController.writeReview)
router.delete('/:id', authentication, authorization, ItineraryController.deleteItinerary)

module.exports = router