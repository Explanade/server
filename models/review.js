const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
  score: {
    type: Number,
    min: 1,
    max: 10,
    default: 0
  },
  message: {
    type: String,
    required: [true, 'Please enter your message']
  },
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