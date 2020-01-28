const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Itinerary = require('../models/itinerary')
const Activity = require('../models/activity')
const ItineraryController = require('../controllers/itinerary')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let userToken = ''
let userToken2 = ''

let dummyItinerary = ''
let itinWithActivities = ''

let dummyItinerary = {}
let completeItin = {}

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


let activities = {
  '0': [
    {
      formatted_address: '1 Chome-9 Dotonbori, Chuo Ward, Osaka, 542-0071, Japan',
      geometry: [],
      icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
      id: '321f2ea5c52bbb02c764eb49ffb19122b53ec668',
      name: 'Dotonbori',
      opening_hours: [],
      photos: [],
      place_id: 'ChIJ_fmKgRPnAGARkKWLtCYTu7g',
      plus_code: [],
      rating: 4.3,
      reference: 'ChIJ_fmKgRPnAGARkKWLtCYTu7g',
      types: [],
      user_ratings_total: 49585,
      photo: 'https://lh3.googleusercontent.com//p/AF1QipNIiMbztZtZTXFoRJjAqbG_27IDNdyWDnYfCmP9=s1600-w400',
      lat: 34.6687315,
      lng: 135.5012911,
      order: 0

let completeData = {
  name: 'My Awesome Test',
  location: {
    name: "Bali",
    lat: -6.903429,
    lng: 107.5030708
  },
  start_date: '01/20/2020',
  end_date: '01/22/2020'
}

let activityData = {
  itinerary_id: "",
  date: "2020-10-20",
  places: [
    {
      status: false,
      order: 1,
      formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
      lat: -8.149365,
      lng: 115.0493949,
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "69493390994402db96ce08fc41c43abbcf5559f8",
      name: "Secret Garden Restaurant",
      photo: '',
      place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
      price_level: 2,
      rating: 4.6,
      user_ratings_total: 269
    },
    {
      status: false,
      order: 2,
      formatted_address: "Jl. Dewisita No.10, Banjar Padang, Tegal, Kabupaten Gianyar, Bali 80571, Indonesia",
      lat: -8.5101692,
      lng: 115.2635134,
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "dec40100516b3d695ee816b81a7606d74791c9f3",
      name: "Restaurant Locavore",
      photo: '',
      price_level: 4,
      rating: 4.5,
      user_ratings_total: 620
    },
    {
      status: false,
      order: 3,
      formatted_address: "Jl. Pura Dalem Lovina Singaraja, Desa, Anturan, Kec. Buleleng, Kabupaten Buleleng, Bali 81119, Indonesia",
      lat: -8.149365,
      lng: 115.0493949,
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      id: "69493390994402db96ce08fc41c43abbcf5559g9",
      name: "Secret Garden Restaurant",
      photo: '',
      place_id: "ChIJu7Db_-Ka0S0RSyHGifETfxs",
      price_level: 2,
      rating: 4.6,
      user_ratings_total: 269
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
      const completeItineraryData = { ...itineraryData }
      completeItineraryData.user_id = user._id
      return Itinerary.create(completeItineraryData)
    })
    .then(itinerary => {
      let dummyActivityData = { ...activityData }
      dummyActivityData.itinerary_id = itinerary._id
      // let tempItinerary = itinerary
      // tempItinerary.activities = dummyActivityData

      return User.create(secondUser)
    //   return ItineraryController.updateItinerary(activityData)
    // .then(activity => {
    // })
    .then(user2 => {
      userToken2 = generateToken({
        id: user2._id,
        name: user2.name,
        email: user2.email
      })
      done()
    })
    })
    .catch(console.log)
})

after(function (done) {
  if (process.env.NODE_ENV === 'test') {
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

describe('CRD Itinerary Endpoints', function () {
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
          dummyItinerary.activities = activities;
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
          .end(function (err, res) {
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
          .end(function (err, res) {
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
          .end(function (err, res) {
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
          .end(function (err, res) {
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
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body.message).to.equal("bad request")
            done()
          })
      })
    })
  })
  describe('PUT /itineraries', () => {
    describe('success process', () => {
      it('should return an object (data) with status code 200', (done) => {
        chai.request(app)
        .put(`/itineraries/${dummyItinerary._id}`)
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send({itinerary: dummyItinerary})
        .end(function(err, res) {
          itinWithActivities = res.body
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
      })
      it('should return an object (data) with status code 200', (done) => {
        chai.request(app)
        .put(`/itineraries/${dummyItinerary._id}`)
        .set('token', userToken)
        .set('Content-Type', 'application/json')
        .send({itinerary: dummyItinerary})
        .end(function(err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
      })
    })
    describe('error process', () => {

    })
  })
  describe('GET /itineraries', () => {
    describe('success process', () => {
      it('should send an array of object with status code 200', (done) => {
        chai.request(app)
          .get('/itineraries')
          .end(function (err, res) {
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
          .end(function (err, res) {
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
          .end(function (err, res) {
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
          .end(function (err, res) {
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
          .end(function (err, res) {
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
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body.message[0]).to.equal("you have to login first")
            done()
          })
      })
      it('should send a status code 404 cause of wrong endpoint', (done) => {
        chai.request(app)
          .get('/itineraries/my-itinerary')
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object')
            done()
          })
      })
    })
  })

  // =============================================== ITINERARY UPDATE

  // describe('UPDATE /itineraries/:id', () => {
  //   console.log(dummyItinerary)

  //   describe('error process', () => {
  //     it('should send an object with message You are not authorized to perform this action and status code 403 because of invalid token', (done) => {
  //       chai.request(app)
  //         .put('/itineraries/' + dummyItinerary._id)
  //         .set('token', userToken2)
  //         .send(dummyItinerary)
  //         .end((err, res) => {
  //           expect(err).to.be.null
  //           expect(res).to.have.status(403)
  //           done()
  //         })
  //     })
  //     it('should send status code 404 and error message Itinerary not found cause of invalid itinerary id', (done) => {
  //       chai.request(app)
  //         .put('/itineraries/' + invalidItineraryId)
  //         .set('token', userToken)
  //         .end((err, res) => {
  //           expect(err).to.be.null
  //           expect(res).to.have.status(404)
  //           expect(res.body).to.be.an('object').to.have.any.keys('message')
  //           expect(res.body.message).to.equal('Itinerary not found')
  //           done()
  //         })
  //     })
  //   })
  //   describe('success process', () => {
  //     it('should send status code 204', (done) => {
  //       console.log(completeItin)
  //       chai.request(app)
  //         .put('/itineraries/' + completeItin._id)
  //         .set('token', userToken)
  //         .send(completeItin)
  //         .end((err, res) => {
  //           expect(err).to.be.null
  //           expect(res).to.have.status(200)
  //           done()
  //         })
  //     })
  //   })
  //   describe('success process', () => {
  //     let data = { ...completeItin }
  //     it('should send status code 204', (done) => {
  //       chai.request(app)
  //         .put('/itineraries/' + completeItin._id)
  //         .set('token', userToken)
  //         .send(completeItin)
  //         .end((err, res) => {
  //           expect(err).to.be.null
  //           expect(res).to.have.status(200)
  //           done()
  //         })
  //     })
  //   })
  // })


  // ================================================


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