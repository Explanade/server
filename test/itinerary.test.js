const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Itinerary = require('../models/itinerary')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let userToken = ''
let userToken2 = ''
let dummyItinerary = ''
let invalidItineraryId = '5e2b17d2a426a922c7c403c8'

let user = {
  name: 'dummy user',
  email: 'dummyuser@mail.com',
  password: 'user123',
}

let secondUser = {
  name: 'dummy user 2',
  email: 'dummyuser2@mail.com',
  password: 'user321',
}

let itineraryData = {
  name: 'My Awesome Trip',
  location: {
    name: "Bandung",
		lat: -6.903429,
		lng: 107.5030708
  },
  start_date: '01/20/2020',
  end_date: '01/22/2020'
}

before(function(done) {
  // generate Token
  User.create(user)
    .then(user => {
      userToken = generateToken({
        id: user._id,
        name: user.name,
        email: user.email
      })
      return User.create(secondUser)
    })
    .then(user2 => {
      userToken2 = generateToken({
        id: user2._id,
        name: user2.name,
        email: user2.email
      })
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
        done()
      })
      .catch(console.log)
  }
})

describe('CRD Itinerary Endpoints', function() {
  describe('POST /itineraries', () => {
    describe('success process', () => {
      it('should return an object (data) with status code 201', (done) => {
        chai.request(app)
        .post('/itineraries')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(itineraryData)
        .end(function(err, res) {
          dummyItinerary = res.body
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.all.keys("_id",'name', 'location', "date", "user_id", "activities", "reviews", "__v")
          done()
        })
      })
    })
    describe('error process', () => {
      it('should send an error with 401 status code because missing token', (done) => {
        chai.request(app)
        .post('/itineraries')
        .set('Content-Type', 'application/json')
        .send(itineraryData)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body.message[0]).to.equal("you have to login first")
          done()
        })
      })
      it('should send an error with 400 status code because missing itinerary\'s name', (done) => {
        const withoutName = { ...itineraryData }
        delete withoutName.name
        chai.request(app)
        .post('/itineraries')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(withoutName)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body.message).to.equal("bad request")
          done()
        })
      })
      it('should send an error with 400 status code because missing itinerary\'s location', (done) => {
        const withoutLocation = { ...itineraryData }
        delete withoutLocation.location
        chai.request(app)
        .post('/itineraries')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(withoutLocation)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body.message).to.equal("bad request")
          done()
        })
      })
      it('should send an error with 400 status code because missing itinerary\'s start date', (done) => {
        const withoutStartDate = { ...itineraryData }
        delete withoutStartDate.start_date
        chai.request(app)
        .post('/itineraries')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(withoutStartDate)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body.message).to.equal("bad request")
          done()
        })
      })
      it('should send an error with 400 status code because missing itinerary\'s end date', (done) => {
        const withoutEndDate = { ...itineraryData }
        delete withoutEndDate.end_date
        chai.request(app)
        .post('/itineraries')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(withoutEndDate)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body.message).to.equal("bad request")
          done()
        })
      })
    })
  })
  describe('GET /itineraries', () => {
    describe('success process', () => {
      it('should send an array of object with status code 200', (done) => {
        chai.request(app)
        .get('/itineraries')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
    describe('error process', () => {
      it('should send a status code 404 cause of wrong endpoint', (done) => {
        chai.request(app)
        .get('/itinerary')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          done()
        })
      })
    })
  })
  describe('GET /itineraries/:id', () => {
    describe('success process', () => {
      it('should send an object with status code 200', (done) => {
        chai.request(app)
        .get('/itineraries/' + dummyItinerary._id)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
      })
    })
    describe('error process', () => {
      it('should send an object with message itinerary not found and status code 404 because of invalid id', (done) => {
        chai.request(app)
        .get('/itineraries/' + invalidItineraryId)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('itinerary not found')
          done()
        })
      })
    })
  })
  describe('GET /itineraries/my-itineraries', () => {
    describe('success process', () => {
      it('should send an array of object with status code 200', (done) => {
        chai.request(app)
        .get('/itineraries/my-itineraries')
        .set('token', userToken)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
    describe('error process', () => {
      it('should send a status code 401 cause of missing token', (done) => {
        chai.request(app)
        .get('/itineraries/my-itineraries')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body.message[0]).to.equal("you have to login first")
          done()
        })
      })
      it('should send a status code 404 cause of wrong endpoint', (done) => {
        chai.request(app)
        .get('/itineraries/my-itinerary')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          done()
        })
      })
    })
  })
  describe('DELETE /itineraries/:id', () => {
    describe('error process', () => {
      it('should send an object with message You are not authorized to perform this action and status code 403 because of invalid token', (done) => {
        chai.request(app)
        .delete('/itineraries/' + dummyItinerary._id)
        .set('token', userToken2)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(403)
          done()
        })
      })
      it('should send status code 404 and error message Itinerary not found cause of invalid itinerary id', (done) => {
        chai.request(app)
        .delete('/itineraries/' + invalidItineraryId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Itinerary not found')
          done()
        })
      })
    })
    describe('success process', () => {
      it('should send status code 204', (done) => {
        chai.request(app)
        .delete('/itineraries/' + dummyItinerary._id)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(204)
          done()
        })
      })
    })
  })
})