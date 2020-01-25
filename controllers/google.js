const googlePlaces = require('../config/googlePlaces');


class GoogleController {
  static getPlaces(req, res, next) {
      const { query } = req.query;
      googlePlaces({
        method: 'get',
        params: {
          query,
          key: process.env.GOOGLE_KEY
        }
      })
      .then(({data}) => {
          res.status(200).json(data);
      })
      .catch(next) 
  }
}

module.exports = GoogleController