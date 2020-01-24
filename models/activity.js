const { Schema, model } = require('mongoose')

const activitySchema = new Schema({
  itinerary_id: {
    type: Schema.Types.ObjectId,
    ref: 'Itinerary'
  },
  date: Date,
  places: [
    {
      order: Number,
      formatted_address: String,
      location: {
        lat: Number,
        lng: Number
      },
      icon: String,
      id: String,
      name: String,
      photos: [String],
      place_id: String,
      price_level: Number,
      rating: Number,
      user_ratings_total: Number
    }
  ]
})

const Activity = model('Activity', activitySchema)
module.exports = Activity