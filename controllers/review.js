const Review = require('../models/review')
const Itinerary = require('../models/itinerary')
const gcsDelete = require('../helpers/removeGCS')

class ReviewController {
  static create(req, res, next) {
    let { score, message, image, itinerary_id, user_id } = req.body
    if(!score || !message || !image || !itinerary_id || ! user_id) {
      res.status(400).json({ message: 'bad request' })
    } else {
      Review.create({ score, message, image, itinerary_id, user_id })
        .then(review => {
          return Itinerary.updateOne({ _id: itinerary_id }, { $push: { reviews: review._id } })
        })
        .then(result => {
          res.status(201).json({ message: 'review created' })
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
    let { review_id } = req.params.id
    Review.findOne({ _id: review_id })
      .then(review => {
        res.status(200).json(review)
      })
      .catch(next)
  }

  static update(req, res, next) {
    let { review_id } = req.params.id
    let { score, message, image, itinerary_id, user_id, removedImages } = req.body
    Review.findById({ _id: review_id })
      .then(review => {
        if(review) {
          let notDeletedImages = []
          review.images.forEach(oldImage => {
            if(removedImages.indexOf(oldImage) == -1 ) {
              notDeletedImages.push(oldImage)
            }
          })
          image.forEach(newImage => {
            notDeletedImages.push(newImage)
          })

          let gonnaBeDeletedImages = []
          if(removedImages) {
            if(typeof removedImages == 'string') {
              gonnaBeDeletedImages.push(removedImages)
            } else {
              gonnaBeDeletedImages = removedImages
            }
          }
          gonnaBeDeletedImages.forEach(image => {
            gcsDelete(image)
          })
          return Review.findByIdAndUpdate(review_id, { $set: { score, message, notDeletedImages, itinerary_id, user_id } }, { runValidators: true, omitUndefined: true, new: true })
        } else {
          throw ({ status: 404, message: 'Review not found' })
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let { review_id } = req.params.id
    Review.deleteOne({ _id: review_id })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

}

module.exports = ReviewController