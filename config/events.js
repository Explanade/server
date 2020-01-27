const axios = require('axios')

const events = axios.create({
  baseURL: `http://api.eventful.com/json/events/search`
})

module.exports = {
  events
}
