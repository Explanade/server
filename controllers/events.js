const { events } = require('../config/events')
module.exports = {
    fetchEvents(req, res, next){
        const { location } = req.params
        let photo = 'https://dimensionmill.org/wp-content/uploads/2019/03/square-placeholder.jpg'
        events({
            method: 'get',
            params:{
                app_key : process.env.EVENT_KEY,
                location
            }
        })
            .then(({data}) => {
                if(data.events == null || data.events.event.length <= 0){
                    res.status(200).json([])
                }

                data.events.event.map(d => {
                    d.photo = (d.image && d.image.medium) ? d.image.medium.url : photo;
                    d.formatted_address = `${d.venue_name}, ${d.venue_address}`
                    d.name = d.title
                    d.lat = d.latitude
                    d.lng = d.longitude
                    d.rating = 0
                })
                res.status(200).json(data.events.event)
            })
            .catch(next)
    }
}