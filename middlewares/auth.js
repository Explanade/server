const { decodeToken } = require('../helpers/jwt')
// const Itinerary = require('../models/itinerary')
const User = require('../models/user')


const authentication = async (req, res, next) => {
  try {
    req.loggedUser = decodeToken(req.headers.token)
    const user = await User.findOne({
      email: req.loggedUser.email
    })
    if (user) next()
    else throw ({ status: 401, message: 'Authentication Failed' })
  }
  catch (error) {
    next(error)
  }
}

// const authorization = async (req, res, next) => {
//   try {
//     let user_id = req.loggedUser.id
//     let { id } = req.params
//     let findItinerary = await Itinerary.findOne({ _id: id }, { user_id })
//     if (findItinerary) {
//       next()
//     } else {
//       next({ status: 403, message: 'You are not authorized to perform this action' })
//     }
//   } catch (error) {
//     next(error)
//   }

// }

module.exports = {
  authentication,
  // authorization
}


