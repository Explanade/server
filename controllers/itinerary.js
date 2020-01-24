const Itinerary = require('../models/itinerary')

class ItineraryController {
  static create(req, res, next) {
    let { name, location, start_date, end_date } = req.body
    let user_id = req.loggedUser.id
    let start = new Date(start_date)
    let end = new Date(end_date)
    let total_days = (end.getTime() - start.getTime()) / (1000*3600*24)
    let date = {
      start,
      end,
      total_days
    }
    let activities = []
    let reviews = []
    Itinerary.create({ name, location, date, user_id, activities, reviews })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static getOneItinerary(req, res, next) {
    let itinerary_id = req.params.id
    Itinerary.findOne({ _id: itinerary_id })
      .populate('activities.activity_id')
      .then(itinerary => {
        res.status(200).json(itinerary)
      })
      .catch(next)
  }

  static getItineraries(req, res, next) {
    Itinerary.find()
      .populate('activities.activity_id')
      .then(itineraries => {
        res.status(200).json(itineraries)
      })
      .catch(next)
  }

  // static addActivity(req, res, next) {
  //   let itinerary_id = req.params.id
  //   let { activity_id } = req.body
  //   Itinerary.updateOne({ _id: itinerary_id }, { $push: { activities: activity_id } })
  //     .then(result => {
  //       res.status(200).json(result)
  //     })
  //     .catch(next)
  // }

  // static removeActivity(req, res, next) {
  //   let itinerary_id = req.params.id
  //   let { activity_id } = req.body
  //   Itinerary.updateOne({ _id: itinerary_id }, { $pull: { activities: activity_id } })
  //     .then(result => {
  //       res.status(200).json(result)
  //     })
  //     .catch(next)
  // }

  // static writeReview(req, res, next) {
  //   let itinerary_id = req.params.id
  //   let { review_id } = req.body
  //   Itinerary.updateOne({ _id: itinerary_id }, { $push: { reviews: review_id } })
  //     .then(result => {
  //       res.status(200).json(result)
  //     })
  //     .catch(next)
  // }

  static deleteItinerary(req, res, next) {
    let itinerary_id = req.params.id
    Itinerary.deleteOne({ _id: itinerary_id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ItineraryController