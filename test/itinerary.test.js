const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Itinerary = require('../models/itinerary')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let userToken = ''
let dummyItinerary = ''

let user = {
  name: 'dummy user',
  email: 'dummyuser@mail.com',
  password: 'user123',
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

let itineraryDummyData = {
  name: 'My Dummy Trip',
  location: {
    name: "Bandung",
		lat: -6.903429,
		lng: 107.5030708
  },
  start_date: '02/20/2020',
  end_date: '02/22/2020'
}

before(function(done) {
  // generate Token
  User.create(user)
    .then(user => {
      userToken = generateToken({
        _id: user._id,
        name: user.name,
        email: user.email
      })
      done()
    })
    .catch(console.log)
})

before(function(done) {
  // generate dummy itinerary
  Itinerary.create(itineraryDummyData)
    .then(itinerary => {
      dummyItinerary = itinerary
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

describe('CRUD Itinerary Enpoints', function() {
  describe('POST /itineraries', () => {
    describe('success process', () => {
      it('should return an object (data) with status code 201', (done) => {
        chai.request(app)
        .post('/itineraries')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(itineraryData)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys("_id",'name', 'location', "date", "user_id", "activities", "reviews")
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
          expect(res).to.have.status(400)
          expect(res.body.message[0]).to.equal("you have to login first")
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
  })
  
})