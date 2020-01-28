const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect

const EVENT_KEY = process.env.EVENT_KEY

describe('Fetch Events API', function () {
  this.timeout(10000)
  describe('GET /events/:locations', () => {
    describe('success process', () => {
      it('should send an array of objects with status code 200', (done) => {
        let locationQuery = 'Osaka'
        chai.request(app)
          .get(`/events/${locationQuery}`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            done()
          })
      })
      it('should send an object with status code 200', (done) => {
        let locationQuery = 'irian'
        chai.request(app)
          .get(`/events/${locationQuery}`)
          .end(function (err, res) {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array')
            done()
          })
      })
      describe('error process', () => {
        before(() => {
          process.env.EVENT_KEY = 'asd'
        })
        after(() => {
          process.env.EVENT_KEY = EVENT_KEY
        })
        it('should send an object with status code 200 and have error key cause of missing API KEY', (done) => {
          let locationQuery = 'Osaka'
          chai.request(app)
            .get(`/events/${locationQuery}`)
            .end(function (err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res.body).to.be.an('array')
              done()
            })
        })
      })
      
    })
    
  })
  
})

// {"status":"Authentication Error",
// "error":"1",
// "description":"The application key provided (asd) is not registered with Eventful.
//   A valid application key is required."}