const { googlePlaces, googlePhotos } = require('../config/googlePlaces');

class GoogleController {
  static async getPlaces(req, res, next) {
      const { query } = req.query;

      try {
        const { data } = await googlePlaces({
          method: 'get',
          params: {
            query,
            key: process.env.GOOGLE_KEY
          }
        })
        console.log(data)
        if(data.error_message) {
          throw({ status: 400, message: 'bad request' })
        } else if (data) {
          for (let i = 0; i < data.results.length; i++) {
            const photo = await googlePhotos({
              params: {
                maxwidth: 400,
                key: process.env.GOOGLE_KEY,
                photoreference: data.results[i].photos[0].photo_reference
              }
            })
            data.results[i].photo = 'https://lh3.googleusercontent.com/' + photo.request.path;
          }
          res.status(200).json(data)
        }
      } catch(e) {
        next(e)
      }
  }
}

module.exports = GoogleController