const Itinerary = require('../models/itinerary')
const Activity = require('../models/activity')

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
    console.log(req.body)
    if(!name || !location || !start_date || !end_date) {
      res.status(400).json({ message: 'bad request' })
    } else {
      Itinerary.create({ name, location, date, user_id })
        .then(result => {
          res.status(201).json(result)
        })
        .catch(next)
    }
  }

  static getOneItinerary(req, res, next) {
    let itinerary_id = req.params.id
    Itinerary.findOne({ _id: itinerary_id })
      .populate('activities')
      .populate('user_id')
      .populate('reviews')
      .then(itinerary => {
        if(itinerary) res.status(200).json(itinerary)
        else next({ message: 'itinerary not found', status: 404 })
      })
      .catch(next)
  }

  static getItineraries(req, res, next) {
    Itinerary.find()
      .populate('activities')
      .populate('user_id')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user_id'
        }
      })
      .then(itineraries => {
        res.status(200).json(itineraries)
      })
      .catch(next)
  }

  static updateItinerary(req, res, next) {
    const { itinerary } = req.body;
    const activities = itinerary.activities;
    const keys = Object.keys(activities)
    let counter = 0;
    let createdActivitiesId = [];
    console.log(activities)
    Itinerary.findById({ _id: itinerary._id })
      .then(data => {
        if (data.activities.length <= 0) {
          let promises = keys.map(activity => {
            let date = new Date(itinerary.date.start);
            date.setDate(date.getDate() + counter)
            
            counter++;
            return Activity.create({
              itineraryId: itinerary._id,
              orderIndex: counter - 1,
              places: activities[counter - 1],
              date
            })
            .then(data => {
              createdActivitiesId.push(data._id)
            })
            .catch(next)
          })
          Promise.all(promises)
            .then(data => {
              return Itinerary.findOneAndUpdate({ _id: itinerary._id }, { activities: createdActivitiesId },{
                returnOriginal: false
              })
            })
            .then(data => {
              res.status(200).json(data)
            })
            .catch(next)
        } else {
          let promises = keys.map(activity => {
            counter++
            return Activity.findOneAndUpdate({ itineraryId: itinerary._id, orderIndex: counter - 1 },{
              places: activities[counter - 1]
            })
          })
          Promise.all(promises)
            .then(data => {
              return Itinerary.findOne({ _id: itinerary._id })
            })
            .then(data => {
              res.status(200).json(data)
            })
        }
      })
      .catch(next)
  }

  static getUsersItineraries(req, res, next) {
    const user_id = req.loggedUser.id
    Itinerary.find({ user_id })
      .populate('activities')
      .populate('user_id')
      .then(itineraries => {
        res.status(200).json(itineraries)
      })
      .catch(next)
  }

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
    Itinerary.findById(itinerary_id)
      .then(itinerary => {
        return Itinerary.findByIdAndDelete({ _id: itinerary._id })
      })
      .then(_ => {
        res.status(204).json({ message: 'itinerary deleted successfuly' })
      })
      .catch(next)
  }
}

module.exports = ItineraryController
