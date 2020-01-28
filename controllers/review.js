const Review = require('../models/review')
const Itinerary = require('../models/itinerary')
const gcsDelete = require('../helpers/removeGCS')

class ReviewController {
  static create(req, res, next) {
    let newReview = ''
    let { score, message, itinerary_id } = req.body
    let user_id = req.loggedUser.id
    if(!score || !message || !itinerary_id ) {
      res.status(400).json({ message: 'bad request' })
    } else {
      Review.create({ score, message, itinerary_id, user_id })
        .then(review => {
          newReview = review
          return Itinerary.updateOne({ _id: itinerary_id }, { $push: { reviews: review._id } })
        })
        .then(result => {
          res.status(201).json({ review: newReview, message: 'review created' })
        })
        .catch(next)
    }
  }

  static getAll(req, res, next) {
    Review.find()
      .then(reviews => {
        res.status(200).json(reviews)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    let review_id = req.params.id
    Review.findOne({ _id: review_id })
      .populate('user_id')
      .then(review => {
        if(review) {
          res.status(200).json(review)
        } else {
          res.status(404).json({ message: 'review not found' })
        }
      })
      .catch(next)
  }

  static update(req, res, next) {
    let review_id = req.params.id
    let { score, message, itinerary_id, user_id } = req.body
    Review.findByIdAndUpdate(review_id, { $set: { score, message, itinerary_id, user_id } }, { runValidators: true, omitUndefined: true, new: true })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let review_id = req.params.id
    Review.deleteOne({ _id: review_id })
      .then(result => {
        res.status(204).json(result)
      })
      .catch(next)
  }

}

module.exports = ReviewController