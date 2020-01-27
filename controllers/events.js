const { events } = require('../config/events')
module.exports = {
    fetchEvents(req, res, next){
        const { location } = req.params
        events({
            method: 'get',
            params:{
                app_key : process.env.EVENT_KEY,
                location
            }
        })
            .then(({data}) => {
                data.events.event.map(d => {
                    d.formatted_address = `${d.venue_name}, ${d.venue_address}`
                    d.photo = d.image.medium.url
                    d.name = d.title
                    d.lat = d.latitude
                    d.lng = d.longitude
                    d.rating = 0
                })
                res.status(200).json(data.events.event[0])
            })
            .catch(next)
    }
}