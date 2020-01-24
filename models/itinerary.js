const { Schema, model } = require('mongoose')

const itinerarySchema = new Schema({
  name: String,
  location: {
    name: String,
    lat: Number,
    lng: Number
  },
  date: {
    start: Date,
    end: Date,
    total_days: Number
  },
  activities: [
    {
      activity_id: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
      }
    }
  ],
  reviews: [
    {
      review_id: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    }
  ]
})

const Itinerary = model('Itinerary', itinerarySchema)
module.exports = Itinerary