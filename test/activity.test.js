const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Itinerary = require('../models/itinerary')
const Activity = require('../models/activity')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let userToken = ''
let userToken2 = ''
let dummyItinerary = ''
let dummyActivity = ''
let invalidActivityId = '5e2b53762ea565333eb570a5'

let user = {
  name: 'dummy user activity',
  email: 'dummyuseractivity@mail.com',
  password: 'useractivity123',
}
let secondUser = {
  name: 'dummy user activity 2',
  email: 'dummyuseractivity2@mail.com',
  password: 'useractivity321',
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

let activityData = {
  itinerary_id: '',
  date: "2020-10-20",
  places: [
    {
      order: 1,
      formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
      lat: -8.149365,
      lng: 115.0493949,
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "69493390994402db96ce08fc41c43abbcf5559f8",
      name: "Secret Garden Restaurant",
      photos: [
        {
          height: 2000,
          photo_reference: "CmRZAAAAdVXkIMqx0bb0kfvanKqpF4bmhjLgSbjT_fujI2kb7ZfINzA7gQDep30ElJBV3g74yogDIIXwPXJTZ6XXOSPGOe8wetB3r_is-9dZBoc29UV_TPW7knJ6QyaorGyxN3gsEhDkN-lbEofvMx8fYZKg4FivGhSjQ1yIC-3jEHdwX-MWb-QNoRfWHw",
          width: 3008
        }
      ],
        place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
        price_level: 2,
        rating: 4.6,
        user_ratings_total: 269
      }, {
        order: 2,
        formatted_address: "Jl. Dewisita No.10, Banjar Padang, Tegal, Kabupaten Gianyar, Bali 80571, Indonesia",
        lat: -8.5101692,
        lng: 115.2635134,
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
        id: "dec40100516b3d695ee816b81a7606d74791c9f3",
        name: "Restaurant Locavore",
        photos: [
          {
            height: 3480,
            photo_reference: "CmRaAAAAUXhEeW3XGl6ihQVqd2uoIft81JL4HkszdFTM-YrB_OF9J86DR4UT7I61LPEoYfksNBznCIUr9hTomnC8bVl-L42xQH0u_DQ2CcaAs8rs60PRQDi1hgiB9Q_IWz_H87VXEhCySA0_A3sxxuvKgF_1fF26GhRVMiMcy46_6KzEI_pnfClTH7Ft6w",
            width: 4640
          }
        ],
        price_level: 4,
        rating: 4.5,
        user_ratings_total: 620
      }
    ]
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
      const dummyItineraryData = { ...itineraryData }
      dummyItineraryData.user_id = user._id
      return Itinerary.create(dummyItineraryData)
    })
    .then(itinerary => {
      dummyItinerary = itinerary
      activityData.itinerary_id = dummyItinerary._id
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
        return Activity.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete data activity success!')
        done()
      })
      .catch(console.log)
  }
})

describe('CRUD Activity Endpoints', () => {
  describe('POST /activities', () => {
    describe('success process', () => {
      it('should return an object (data) with status code 201', (done) => {
        chai.request(app)
        .post('/activities')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(activityData)
        .end(function(err, res) {
          dummyActivity = res.body
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object').to.have.any.keys("message")
          expect(res.body.message).to.equal("Activity created")
          done()
        })
      })
    })
    describe('error process', () => {
      it('should send a status code 400 cause of missing itinerary\'s id', (done) => {
        const withoutItineraryId = { ...activityData }
        delete withoutItineraryId.itinerary_id
        chai.request(app)
        .post('/activities')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(withoutItineraryId)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys("message")
          expect(res.body.message).to.equal("bad request")
          done()
        })
      })
      it('should send a status code 400 cause of missing date', (done) => {
        const withoutDate = { ...activityData }
        delete withoutDate.date
        chai.request(app)
        .post('/activities')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(withoutDate)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys("message")
          expect(res.body.message).to.equal("bad request")
          done()
        })
      })
      it('should send a status code 400 cause of missing places', (done) => {
        const withoutPlaces = { ...activityData }
        delete withoutPlaces.places
        chai.request(app)
        .post('/activities')
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send(withoutPlaces)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys("message")
          expect(res.body.message).to.equal("bad request")
          done()
        })
      })
      it('should send a status code 401 cause of missing token', (done) => {
        chai.request(app)
        .post('/activities')
        .set('Content-Type', 'application/json')
        .send(activityData)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys("message")
          expect(res.body.message[0]).to.equal("you have to login first")
          done()
        })
      })
    })
  })
  describe('GET /activities', () => {
    describe('success process', () => {
      it('should send an array of object with status code 200', (done) => {
        chai.request(app)
        .get('/activities')
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
        .get('/activity')
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          done()
        })
      })
    })
  })
  describe('GET /activities/:id', () => {
    describe('success process', () => {
      it('should send an object with status code 200', (done) => {
        console.log(dummyActivity.activity._id, '++++++++++++++++++++++')
        chai.request(app)
        .get('/activities/' + dummyActivity.activity._id)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.all.keys("__v", "_id","date", "places")
          done()
        })
      })
    })
    describe('error process', () => {
      it('should send an object with status code 404', (done) => {
        chai.request(app)
        .get('/activities/' + invalidActivityId)
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object').to.have.any.keys("message")
          expect(res.body.message).to.equal('activity not found')
          done()
        })
      })
    })
  })
  describe('DELETE /activities/:id', () => {
    describe('error process', () => {
      it('should send status code 403', (done) => {
        chai.request(app)
        .delete('/activities/' + invalidActivityId)
        .set('token', userToken)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(403)
          done()
        })
      })
    })
    describe('success process', () => {
      it('should send status code 204', (done) => {
        chai.request(app)
        .delete('/activities/' + dummyActivity.activity._id)
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
