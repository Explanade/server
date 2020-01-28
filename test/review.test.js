const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Itinerary = require('../models/itinerary')
const Review = require('../models/review')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let userToken = ''
let userToken2 = ''
let dummyItinerary = ''
let dummyReview = ''
let invalidToken = ''
let invalidReviewId = '5e2b53762ea565333eb570b5'

let user = {
  name: 'dummy user review',
  email: 'dummyuserreview@mail.com',
  password: 'userreview123',
}

let secondUser = {
  name: 'dummy user review 2',
  email: 'dummyuserreview2@mail.com',
  password: 'userreview321',
}

let thirdUser = {
  name: 'dummy user review 3',
  email: 'dummyuserreview3@mail.com',
  password: 'userreview321',
}

let itineraryData = {
  name: 'My Awesome Trip',
  location: {
    name: "Bandung",
    lat: -6.903429,
    lng: 107.5030708
  },
  date: {
    start: '2020-01-19T17:00:00.000Z',
    end: '2020-01-21T17:00:00.000Z',
    total_days: 2
  }
}

let reviewData = {
  score: 8,
  message: 'Great and well planned trip! 5 star.',
  itinerary_id: ''
}

before(function (done) {
  // generate Token
  User.create(user)
    .then(user => {
      userToken = generateToken({
        id: user._id,
        name: user.name,
        email: user.email
      })
      const dummyItineraryData = { ...itineraryData }
      dummyItineraryData.user_id = user._id
      return Itinerary.create(dummyItineraryData)
    })
    .then(itinerary => {
      reviewData.itinerary_id = itinerary._id
      return User.create(secondUser)
    })
    .then(user2 => {
      reviewData.user_id = user2._id
      userToken2 = generateToken({
        id: user2._id,
        name: user2.name,
        email: user2.email
      })
      return User.create(thirdUser)
    })
    .then(user3 => {
      invalidToken = generateToken({
        id: user3._id,
        name: user3.name,
        email: user3.email
      })
      return User.deleteOne({ _id: user3._id })
    })
    .then(_ => {
      done()
    })
    .catch(console.log)
})

after(function(done) {
  if(process.env.NODE_ENV === 'test') {
    User.deleteMany({})
      .then(_ => {
        console.log('testing: delete data user success!')
        return Itinerary.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete data itinerary success!')
        return Review.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete data review success!')
        done()
      })
      .catch(console.log)
  }
})

describe('CRUD Review Endpoints', () => {
  describe('POST /reviews', () => {
    describe('success process', () => {
      it('should return an object (data) with status code 201', (done) => {
        // console.log(reviewData.itinerary_id)
        chai.request(app)
          .post('/reviews')
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .send(reviewData)
          .end(function (err, res) {
            dummyReview = res.body
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message).to.equal("review created")
            done()
          })
      })
    })
    describe('error process', () => {
      it('should send a status code 400 cause of missing score', (done) => {
        const missingScore = { ...dummyReview }
        delete missingScore.score
        chai.request(app)
          .post('/reviews')
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .send(missingScore)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message).to.equal("bad request")
            done()
          })
      })
      it('should send a status code 400 cause of missing message', (done) => {
        const missingMessage = { ...dummyReview }
        delete missingMessage.message
        chai.request(app)
          .post('/reviews')
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .send(missingMessage)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message).to.equal("bad request")
            done()
          })
      })
      it('should send a status code 400 cause of missing itinerary\'s id', (done) => {
        chai.request(app)
          .post('/reviews')
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .field('score', reviewData.score)
          .field('message', reviewData.message)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message).to.equal("bad request")
            done()
          })
      })
      it('should send a status code 401 cause of missing token', (done) => {
        chai.request(app)
          .post('/reviews')
          .set('Content-Type', 'application/json')
          .send(reviewData)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message[0]).to.equal("you have to login first")
            done()
          })
      })
      it('should send a status code 401 cause of invalid token', (done) => {
        chai.request(app)
          .post('/reviews')
          .set('token', invalidToken)
          .set('Content-Type', 'application/json')
          .send(reviewData)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message).to.equal("Authentication Failed")
            done()
          })
      })
    })
  })
  describe('GET /reviews', () => {
    describe('success process', () => {
      it('should send an array of object with status code 200', (done) => {
        chai.request(app)
          .get('/reviews')
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            done()
          })
      })
    })
    describe('error process', () => {
      it('should send an array of object with status code 404 cause of wrong endpoint', (done) => {
        chai.request(app)
          .get('/review')
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object')
            done()
          })
      })
    })
  })
  describe('GET /reviews/:id', () => {
    describe('success process', () => {
      it('should send an object with status code 200', (done) => {
        chai.request(app)
          .get('/reviews/' + dummyReview.review._id)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object').to.have.all.keys("__v", "_id", "score", "message", "itinerary_id", "user_id")
            done()
          })
      })
    })
    describe('error process', () => {
      it('should send an object with status code 404', (done) => {
        chai.request(app)
          .get('/reviews/' + invalidReviewId)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message).to.equal('review not found')
            done()
          })
      })
      it('should send an array of object with status code 404 cause of wrong endpoint', (done) => {
        chai.request(app)
          .get('/review' + dummyReview.review._id)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object')
            done()
          })
      })
      it('should send an array of object with status code 404 cause of wrong endpoint', (done) => {
        chai.request(app)
          .get('/review/' + dummyReview.review._id)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object')
            done()
          })
      })
    })
  })
  describe('PUT /reviews/:id', () => {
    describe('success process', () => {
      it('should send an object with status code 200', (done) => {
        // console.log(dummyReview, '<<<<<<<?|>>>>>>>>>>>>>')
        chai.request(app)
          .put('/reviews/' + dummyReview.review._id)
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .field('score', 9)
          .field('message', 'revising review')
          .field('itinerary_id', dummyReview.review.itinerary_id)
          .field('user_id', dummyReview.review.user_id)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            done()
          })
      })
    })
    describe('error process', () => {
      it('should send a status code 404 cause of invalid id', (done) => {
        chai.request(app)
          .put('/reviews/' + invalidReviewId)
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .field('score', 9)
          .field('message', 'revising review')
          .field('itinerary_id', dummyReview.review.itinerary_id)
          .field('user_id', dummyReview.review.user_id)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message).to.equal('Review not found')
            done()
          })
      })
      it('should send a status code 401 cause of invalid token', (done) => {
        chai.request(app)
          .put('/reviews/' + dummyReview.review._id)
          .set('token', invalidToken)
          .set('Content-Type', 'application/json')
          .field('score', 9)
          .field('message', 'revising review')
          .field('itinerary_id', dummyReview.review.itinerary_id)
          .field('user_id', dummyReview.review.user_id)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message).to.equal('Authentication Failed')
            done()
          })
      })
      it('should send a status code 403 cause of invalid user', (done) => {
        chai.request(app)
          .put('/reviews/' + dummyReview.review._id)
          .set('token', userToken)
          .set('Content-Type', 'application/json')
          .field('score', 9)
          .field('message', 'revising review')
          .field('itinerary_id', dummyReview.review.itinerary_id)
          .field('user_id', dummyReview.review.user_id)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body).to.be.an('object').to.have.any.keys("message")
            expect(res.body.message).to.equal('You are not authorized to perform this action')
            done()
          })
      })
      it('should send a status code 404 cause of invalid endpoint', (done) => {
        chai.request(app)
          .put('/review/' + dummyReview.review._id)
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .field('score', 9)
          .field('message', 'revising review')
          .field('itinerary_id', dummyReview.review.itinerary_id)
          .field('user_id', dummyReview.review.user_id)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object')
            done()
          })
      })
    })
  })
  describe('DELETE /reviews/:id', () => {
    describe('error process', () => {
      it('should send an object with message You are not authorized to perform this action and status code 403 because of using other user\'s token', (done) => {
        chai.request(app)
          .delete('/reviews/' + dummyReview.review._id)
          .set('token', userToken)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(403)
            expect(res.body.message).to.equal('You are not authorized to perform this action')
            done()
          })
      })
      it('should send an object with message review not found and status code 404 because of invalid id', (done) => {
        chai.request(app)
          .delete('/reviews/' + invalidReviewId)
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body.message).to.equal('Review not found')
            done()
          })
      })
      it('should send an object with message Authentication Failed and status code 401 because of invalid token', (done) => {
        chai.request(app)
          .delete('/reviews/' + dummyReview.review._id)
          .set('token', invalidToken)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body.message).to.equal('Authentication Failed')
            done()
          })
      })
      it('should send a status code 404 cause of invalid endpoint', (done) => {
        chai.request(app)
          .delete('/review/' + dummyReview.review._id)
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object')
            done()
          })
      })
    })
    describe('success process', () => {
      it('should send status code 204', (done) => {
        chai.request(app)
          .delete('/reviews/' + dummyReview.review._id)
          .set('token', userToken2)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(204)
            done()
          })
      })
    })
  })
})
