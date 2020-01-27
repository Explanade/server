const axios = require('axios')

const googlePlaces = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/textsearch/json'
})

const googlePhotos = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/photo'
})

module.exports = {
  googlePlaces,
  googlePhotos
}
