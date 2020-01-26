const { Schema, model } = require('mongoose')

const activitySchema = new Schema({
  date: Date,
  orderIndex: String,
  places: [
    {
      status: false,
      order: Number,
      formatted_address: String,
      lat: Number,
      lng: Number,
      icon: String,
      id: String,
      name: String,
      photos: [
        {
          height: Number,
          // html_attributions: [String],
          photo_reference: String,
          width: Number
        }
      ],
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