const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require('../app')
const User = require('../models/user')
const fs = require('fs');


chai.use(chaiHttp)
const expect = chai.expect

describe('USER ENDPOINTS', function () {
    this.timeout(10000)

    let newUser = {
        name: 'user',
        email: 'user@mail.com',
        password: 'user'
    }

    let token = '',
        tokenGoogle = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhZDM5NzU0ZGYzYjI0M2YwNDI4YmU5YzUzNjFkYmE1YjEwZmZjYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTc5NjQwNzgyNTY1LW1kamVqMTFqajlqNjFzNWhycW5qMXFqY3N0aTY5OWk3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTc5NjQwNzgyNTY1LW1kamVqMTFqajlqNjFzNWhycW5qMXFqY3N0aTY5OWk3LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2NzAxNzk2NjQwNjA2NDg5ODMyIiwiZW1haWwiOiJhZmlmYWhyYWhtYWsuYXBwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTmlHcENHZDU1bEVQbG9BNVlRaXJiQSIsIm5hbWUiOiJhZmlmYWhyYWhtYWsgYXBwIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tazljblJjODZpNW8vQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNIaTNyZXN0TkxzSVBaa05oSHZsVGZEck5qVk8yamwwQS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiYWZpZmFocmFobWFrIiwiZmFtaWx5X25hbWUiOiJhcHAiLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTU3OTg0ODMxMCwiZXhwIjoxNTc5ODUxOTEwLCJqdGkiOiIyODUwOWM1OTdiMjRlNGM1MzdkYzJkOWM5ZDg5ZTljMDQ5ZjY1MjQ1In0.FGHigYRsAhma3Y1bdYW9IdXxRG8dWNczPb9Z5BFdvQhjNFpIPmAEfEFwlU9nRrJXAOHskkhWj5D5vcxZZQw5aOfZOwv57F7alv3brsCYcYvTDrQxsZBbqImzJYGG1yPjUNi-bkxFFzsLP-yLIA2bNuZY8L-E0O-BeJwh2ZgblKeNUIFRVXOcSyez6NOI9CccG26ph9Mq8JviEvXVryg-MccngXHMRTIOhLoOv0I3dqew79s7SeJGS2PsZYcd-TpCEEpipBBuCCY3PYSKlRDILHDnhIObjOkYGtt26I_ns2rDNmgek0es31DRuQff8UMrTMGonolJd_Y-ctlH12Heyg'

    after(function (done) {
        User.deleteMany({})
            .then(result => done())
            .catch(console.log)
    })

    describe('POST user/register', () => {
        describe(`success response:`, () => {

            it('should return status 201: user success registered', (done) => {
                chai.request(app)
                    .post(`/user/register`)
                    .send(newUser)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('Object').to.have.all.keys('_id', 'name', 'email', 'password', 'profile_picture')
                        expect(res.body.password).to.be.not.equal(newUser.password)
                        done()
                    })
            })
        })

        describe(`error or failed response:`, () => {

            it('user failed registered : empty name', (done) => {
                let userFail = { ...newUser }
                delete userFail.name
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('Please enter your name')
                        done()
                    })
            })

            it('user failed registered : empty email', (done) => {
                let userFail = { ...newUser }
                delete userFail.email
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('Please enter your email address.')
                        done()
                    })
            })

            it('user failed registered : empty password', (done) => {
                let userFail = { ...newUser }
                delete userFail.password
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('Please enter your password')
                        done()
                    })
            })

            it('user failed registered : email has already registered before', (done) => {
                let userFail = { ...newUser }
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('email already registered')
                        done()
                    })
            })

            it('user failed registered : invalid email format', (done) => {
                let userFail = { ...newUser, email: "failed.com" }
                chai.request(app)
                    .post(`/user/register`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.keys('message')
                        expect(res.body.message).to.be.an('Array').that.includes('Please enter a valid email address')
                        done()
                    })
            })

        })

    })

    describe('POST /user/login', () => {
        describe(`success response`, () => {
            it('user success log in, supposed to return a token with status 200', (done) => {
                let userLogin = { ...newUser }
                delete userLogin.name
                chai.request(app)
                    .post(`/user/login`)
                    .send(userLogin)
                    .end((err, res) => {
                        token = res.body.token
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('Object').to.have.all.keys('token', 'user')
                        expect(res.body.user).to.be.an('Object').to.have.all.keys('id', 'name', 'email')
                        done()
                    })
            })
        })

        describe(`error or failed response`, () => {
            it('user failed log in : invalid email (400)', (done) => {
                let userFail = { ...newUser, email: "failed.com" }
                chai.request(app)
                    .post(`/user/login`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal('Invalid password or email')
                        done()
                    })
            })

            it('user failed log in : invalid password (400)', (done) => {
                let userFail = { ...newUser, password: "failed" }
                chai.request(app)
                    .post(`/user/login`)
                    .send(userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal('Invalid password or email')
                        done()
                    })
            })

            it('user failed log in : email is not registered (400)', function (done) {
                let userFail = { ...newUser, email: "user@failed.com" }
                chai.request(app)
                    .post('/user/login')
                    .send(userFail)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body.message).to.equal('Invalid password or email')
                        done()
                    })
            })
        })
    })

    describe('POST /user/googleLogin', () => {
        describe(`success response`, () => {
            it('user success log in, supposed to return a token with status 200', (done) => {
                let userLogin = { ...newUser }
                delete userLogin.name
                chai.request(app)
                    .post(`/user/googleLogin`)
                    .send('token', tokenGoogle)
                    .end((err, res) => {
                        token = res.body.token
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('Object').to.have.all.keys('token', 'user')
                        expect(res.body.user).to.be.an('Object').to.have.all.keys('id', 'name', 'email')
                        done()
                    })
            })
        })

        describe(`error or failed response`, () => {
            it('user failed log in : invalid token', (done) => {
                let userFail = tokenGoogle.slice(0, tokenGoogle.length - 3)
                chai.request(app)
                    .post(`/user/googleLogin`)
                    .send('token', userFail)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal('Invalid password or email')
                        done()
                    })
            })
        })
    })

    describe('UPDATE /user/update', function () {
        describe('success response', function () {
            it('should return status 200 and update user profile_picture', function (done) {
                chai.request(app)
                    .patch('/user/update')
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .attach('profile_picture',
                        fs.readFileSync('./assets/avatar.png'),
                        'avatar.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object').to.have.any.keys('updated', 'message')
                        expect(res.body.updated).to.have.any.keys('n', 'nModified', 'ok')
                        expect(res.body.updated.nModified).to.equal(1)
                        expect(res.body.updated.message).to.equal('success update profile')
                        done()
                    })
            })
            it('should return status 200 and update user name', function (done) {
                chai.request(app)
                    .patch('/user/update')
                    .set('token', token)
                    .send({ name: 'updatedUser' })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object').to.have.any.keys('updated', 'message')
                        expect(res.body.updated).to.have.any.keys('n', 'nModified', 'ok')
                        expect(res.body.updated.nModified).to.equal(1)
                        expect(res.body.updated.message).to.equal('success update profile')
                        done()
                    })
            })
            it('should return status 200 and update user email', function (done) {
                chai.request(app)
                    .patch('/user/update')
                    .set('token', token)
                    .send({ email: 'updatedUser@mail.com' })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object').to.have.any.keys('updated', 'message')
                        expect(res.body.updated).to.have.any.keys('n', 'nModified', 'ok')
                        expect(res.body.updated.nModified).to.equal(1)
                        expect(res.body.updated.message).to.equal('success update profile')
                        done()
                    })
            })
        })


        describe(`error or failed response`, function () {
            it('failed update profile : no user login', function (done) {
                chai.request(app)
                    .patch('/user/update')
                    .send({ email: 'updatedUser@mail.com' })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message[0]).to.equal('you have to login first')
                        done()
                    })
            })

            it('failed update profile : invalid data type', function (done) {
                chai.request(app)
                    .patch('/user/update')
                    .attach('profile_picture',
                        fs.readFileSync('./assets/avatar.png'),
                        'avatar.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message[0]).to.equal('you have to login first')
                        done()
                    })
            })
        })
    })

    describe('GET /user', function () {
        describe('success response', function () {
            it('should return status 200 and show all users', function (done) {
                chai.request(app)
                    .get('/user')
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