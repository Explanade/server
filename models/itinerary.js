const { Schema, model } = require('mongoose')

const itinerarySchema = new Schema({
  name: {
    type: String,
    required: [true, 'please input your itinerary\'s name']
  },
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
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Activity'
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
})

const Itinerary = model('Itinerary', itinerarySchema)
module.exports = Itinerary