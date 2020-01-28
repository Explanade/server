const Activity = require('../models/activity')
const Itinerary = require('../models/itinerary')

class ActivityController {
  static create(req, res, next) {
    let newActivity = ''
    let { itinerary_id, date, places } = req.body
    if(!itinerary_id || !date || !places) {
      res.status(400).json({ message: 'bad request' })
    } else {
      Activity.create({ itinerary_id, date, places })
        .then(activity => {
          newActivity = activity
          return Itinerary.updateOne({ _id: itinerary_id }, { $push: { activities: activity._id } })
        })
        .then(result => {
          res.status(201).json({activity: newActivity, message: 'Activity created'})
        })
        .catch(next)
    }
  }

  static getAll(req, res, next) {
    Activity.find()
      .then(activities => {
        res.status(200).json(activities)
      })
      .catch(next)
  }

  static getOneActivity(req, res, next) {
    let activity_id = req.params.id
    Activity.findOne({ _id: activity_id })
      .then(activity => {
        if(activity) {
          res.status(200).json(activity)
        }
        else {
          res.status(404).json({ message: 'activity not found' })
        }
      })
      .catch(next)
  }

  static updateActivity(req, res, next) {
    let activity_id = req.params.id
    let { place_id, status } = req.body
    Activity.findOneAndUpdate({ _id: activity_id, "places.id": place_id }, { $set: { 'places.$.status': status } }, { new: true })  
      .then(result => {
        return Itinerary.findOne({ _id: result.itinerary_id }).populate('activities')
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static deleteActivity(req, res, next) {
    let activity_id = req.params.id
    Activity.deleteOne({ _id: activity_id })
      .then(result => {
        res.status(204).json(result)
      })
      .catch(next)
  }
}

module.exports = ActivityController