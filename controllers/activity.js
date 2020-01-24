const Activity = require('../models/activity')
const Itinerary = require('../models/itinerary')

class ActivityController {
  static create(req, res, next) {
    let { itinerary_id, date, places } = req.body
    Activity.create({ date, places })
      .then(activity => {
        console.log(activity)
        return Itinerary.updateOne({ _id: itinerary_id }, { $push: { activities: activity._id } })
      })
      .then(result => {
        res.status(201).json({message: 'Activity created'})
      })
      .catch(next)
  }

  static getAllItinerarysActivity(req, res, next) {
    let { itinerary_id } = req.body
    Activity.find({ itinerary_id })
      .then(activities => {
        res.status(200).json(activities)
      })
      .catch(next)
  }

  static getOneActivity(req, res, next) {
    let activity_id = req.params.id
    Activity.findOne({ _id: activity_id })
  }

  static updateActivity(req, res, next) {
    let activity_id = req.params.id
    let { itinerary_id, date, places } = req.body
    Activity.findByIdAndUpdate({ _id: activity_id }, { $set: { itinerary_id, date, places } }, { omitUndefined: true, new: true })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static deleteActivity(req, res, next) {
    let activity_id = req.params.id
    Activity.deleteOne({ _id: activity_id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = ActivityController