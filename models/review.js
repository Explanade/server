const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
  score: Number,
  message: String,
  images: [String],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  itinerary_id: {
    type: Schema.Types.ObjectId,
    ref: 'Itinerary'
  }
})

const Review = model('Review', reviewSchema)
module.exports = Review