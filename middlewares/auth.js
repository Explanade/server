const { decodeToken } = require('../helpers/jwt')
const User = require('../models/user')
const Itinerary = require('../models/itinerary')
const Activity = require('../models/activity')
const Review = require('../models/review')

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

const authorization = async (req, res, next) => {
  try {
    let user_id = req.loggedUser.id
    let { id } = req.params
    let findItinerary = await Itinerary.findOne({ _id: id })
    if (findItinerary) {
      if(findItinerary.user_id == user_id) {
        next()
      } else {
        next({ status: 403, message: 'You are not authorized to perform this action' })
      }
    } else {
      throw ({ status: 404, message: 'Itinerary not found' })
    }
  } catch (error) {
    next(error)
  }
}

const activityAuthorization = async (req, res, next) => {
  try {
    let { id } = req.params
    let findActivity = await Activity.findOne({ _id: id })
    if (findActivity) {
      next()
    } else {
      throw({ status: 403, message: 'You are not authorized to perform this action' })
    }
  } catch (error) {
    next(error)
  }
}

const reviewAuthorization = async (req, res, next) => {
  try {
    let user_id = req.loggedUser.id
    let { id } = req.params
    let findReview = await Review.findOne({ _id: id })
    if (findReview) {
      if(findReview.user_id == user_id) {
        next()
      } else {
        next({ status: 403, message: 'You are not authorized to perform this action' })
      }
    } else {
      throw({ status: 404, message: 'Review not found' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authentication,
  authorization,
  activityAuthorization,
  reviewAuthorization
}

