const Itinerary = require('../models/itinerary')

class ItineraryController {
  static create(req, res, next) {
    let { location, date } = req.body
    let activities = []
    let reviews = []
    Itinerary.create({ location, date, activities, reviews })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  
}

module.exports = ItineraryController