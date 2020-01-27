const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect

const GOOGLE_KEY = process.env.GOOGLE_KEY

describe('Fetch Google Places API', () => {
  describe('GET /google/places', () => {
    describe('success process', () => {
      it('should send an object with status code 200', (done) => {
        let query = 'bali'
        chai.request(app)
            .get('/google/places' + `?query=${query}`)
            .end(function (err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res.body).to.be.an('object').to.have.all.keys("html_attributions", 'results', "status")
              done()
            })
      })
    })
    describe('error process', () => {
      before(() => {
        process.env.GOOGLE_KEY = 'sdf'
      })
      after(() => {
        process.env.GOOGLE_KEY = GOOGLE_KEY
      })
      it('should send an object with status code 200 and have the error_message key cause of missing API KEY', (done) => {
        let query = 'bali'
        chai.request(app)
            .get('/google/places' + `?query=${query}`)
            .end(function (err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(400)
              expect(res.body).to.be.an('object').to.have.all.keys("message")
              expect(res.body.message).to.equal('bad request')
              done()
            })
      })
    })
    describe('error process', () => {
      it('should send an object with status code 200 and have the status key equal to \'INVALID_REQUEST\' cause of missing query', (done) => {
        chai.request(app)
            .get('/google/places')
            .end(function (err, res) {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res.body).to.be.an('object').to.have.all.keys("html_attributions", 'results', "status")
              expect(res.body.status).to.equal('INVALID_REQUEST')
              done()
            })
      })
    })
  })
})