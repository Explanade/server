const router = require('express').Router()
const user = require('./user')
const itinerary = require('./itinerary')
const activity = require('./activity')
const review = require('./review')
const google = require('./google')

router.get('/', (req, res) => res.send(`Hello World - from Explanade <3`))
router.use('/user', user)
router.use('/itineraries', itinerary)
router.use('/activities', activity)
router.use('/reviews', review)
router.use('/google', google)

module.exports = router