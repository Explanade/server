const router = require('express').Router()
const user = require('./user')
const itinerary = require('./itinerary')


router.get('/', (req, res) => res.send(`Hello World - from Explanade <3`))
router.use('/users', user)
router.use('/itineraries', itinerary)


module.exports = router