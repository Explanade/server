const { decodeToken } = require('../helpers/jwt')
const Itinerary = require('../models/itinerary')
const User = require('../models/user')


const authentication = (req, res, next) => {
  try {
    req.loggedUser = decodeToken(req.headers.token)
    User.findOne({
      email: req.loggedUser.email
    })
      .then(user => {
        if (user) next()
        else throw new Error({ status: 401, message: 'Authentication Failed' })
      })
      .catch(next)
  }
  catch (error) {
    next(error)
  }
}

async function authorization(req, res, next) {
  try {
    console.log(req.loggedUser)
    let user_id = req.loggedUser.id
    let { id } = req.params
    let findItinerary = await Itinerary.findOne({ _id: id }, { user_id })
    if (findItinerary) {
      next()
    } else {
      next({ status: 403, message: 'You are not authorized to perform this action' })
    }
  } catch (error) {
    next(error)
  }

}

module.exports = { authentication, authorization }


