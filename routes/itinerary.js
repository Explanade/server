const router = require('express').Router()
const ItineraryController = require('../controllers/itinerary')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', ItineraryController.getItineraries)
router.get('/my-itineraries', authentication, ItineraryController.getUsersItineraries)
router.get('/:id', ItineraryController.getOneItinerary)
router.post('/', authentication, ItineraryController.create)
router.put('/:id', authentication, authorization, ItineraryController.updateItinerary)
router.patch('/:id', authentication, authorization, ItineraryController.addBudget)
router.delete('/:id', authentication, authorization, ItineraryController.deleteItinerary)

module.exports = router