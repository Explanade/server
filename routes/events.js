const router = require('express').Router()
const EventController = require('../controllers/events')

router.get('/:location', EventController.fetchEvents)

module.exports = router