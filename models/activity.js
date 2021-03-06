const { Schema, model } = require('mongoose')

const activitySchema = new Schema({
  itinerary_id: {
    type: Schema.Types.ObjectId,
    ref: 'Itinerary'
  },
  date: Date,
  orderIndex: String,
  places: [
    {
      status: {
        type: Boolean,
        default: false
      },
      order: Number,
      formatted_address: String,
      lat: Number,
      lng: Number,
      icon: String,
      id: String,
      name: String,
      photo: String,
      place_id: String,
      price_level: Number,
      rating: Number,
      user_ratings_total: Number
    }
  ],
  itineraryId: {
      type: Schema.Types.ObjectId,
      ref: 'Itinerary'
  }
})

const Activity = model('Activity', activitySchema)
module.exports = Activity