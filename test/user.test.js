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
        name: 'newUser',
        email: 'newUser@mail.com',
        password: 'newUser'
    }
    let user = {
        name: 'user',
        email: 'user@mail.com',
        password: 'user'
    }
    let token = '', tokenUser = ''

    before(function (done) {
        User.create(user)
            .then(result => {
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: result.email,
                        password: user.password
                    })
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            tokenUser = res.body.token
                            done()
                        }
                    })
            })
            .catch(console.log)
    })

    after(function (done) {
        User.deleteMany({})
            .then(result => done())
            .catch(console.log)
    })

    describe('DELETE /user', function () {
        describe('success response', function () {
            it('should return status 200 and delete user logged in', function (done) {
                chai.request(app)
                    .delete('/user')
                    .set('token', tokenUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.any.keys('n', 'deletedCount', 'ok')
                        expect(res.body.deletedCount).to.equal(1)
                        done()
                    })
            })
        })
        describe('error response', function () {
            it('should return status 401 : no user logged in', function (done) {
                chai.request(app)
                    .delete('/user')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message[0]).to.equal('you have to login first')
                        done()
                    })
            })
        })
    })


    describe('POST user/register', () => {
        describe(`success response:`, () => {

            it('should return status 201: user success registered', (done) => {
                chai.request(app)
                    .post(`/user/register`)
                    .field('name', 'newUser')
                    .field('email', 'newUser@mail.com')
                    .field('password', 'newUser')
                    .attach('profile_picture', fs.readFileSync('./test/assets/avatar.png'), 'avatar.png')
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('Object').to.have.all.keys('token', 'user')
                        expect(res.body.password).to.be.not.equal(newUser.password)
                        done()
                    })
            })

            it('should return status 201: user success registered', (done) => {
                chai.request(app)
                    .post(`/user/register`)
                    .field('name', 'newUser2')
                    .field('email', 'newUser2@mail.com')
                    .field('password', 'newUser2')
                    .attach('profile_picture', fs.readFileSync('./test/assets/avatar.png'), 'avatar.png')
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('Object').to.have.all.keys('token', 'user')
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
                        expect(res.body.user).to.be.an('Object').to.have.all.keys('id', 'name', 'email', 'profile_picture')
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

    describe('GET /user/profile', function () {
        describe('success response', function () {
            it('should return status 200 and show profile user logged in', function (done) {
                chai.request(app)
                    .get('/user/profile')
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('Object')
                        expect(res.body).to.have.all.keys('_id', 'name', 'email', 'password', 'profile_picture')
                        done()
                    })
            })
        })
        describe('error response', function () {
            it('should return status should return status 404', function (done) {
                chai.request(app)
                    .get('/users/profile')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        done()
                    })
            })
        })
    })

    describe('GET /user/profile', function () {
        describe('success response', function () {
            it('should return status 200 and show profile user logged in', function (done) {
                chai.request(app)
                    .get('/user/profile')
                    .set('token', token.slice(0, token.length - 2))
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message[0]).to.equal(`You're session is expired. Please login.`)
                        done()
                    })
            })
        })
        describe('error response', function () {
            it('should return status should return status 404', function (done) {
                chai.request(app)
                    .get('/user/profile')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message[0]).to.equal(`you have to login first`)
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
                        fs.readFileSync('./test/assets/avatar.png'),
                        'avatar.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object').to.have.any.keys('updated', 'message')
                        expect(res.body.updated).to.have.any.keys('n', 'nModified', 'ok')
                        expect(res.body.updated.nModified).to.equal(1)
                        expect(res.body.message).to.equal('success update profile')
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
                        expect(res.body.message).to.equal('success update profile')
                        done()
                    })
            })
            it('should return status 200 and update user email', function (done) {
                chai.request(app)
                    .patch('/user/update')
                    .set('Content-Type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send({ email: 'updatedUser@mail.com' })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object').to.have.any.keys('updated', 'message')
                        expect(res.body.updated).to.have.any.keys('n', 'nModified', 'ok')
                        expect(res.body.updated.nModified).to.equal(1)
                        expect(res.body.message).to.equal('success update profile')
                        done()
                    })
            })
        })


        describe(`error or failed response`, function () {

            it('failed update profile : invalid data type', function (done) {
                chai.request(app)
                    .patch('/user/update')
                    .set('token', token)
                    .attach('profile_picture',
                        fs.readFileSync('./test/assets/avatar.png'),
                        'avatar.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(401)
                        expect(res.body.message).to.equal('Authentication Failed')
                        done()
                    })
            })

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

        })
    })

    describe('GET /user', function () {
        describe('success response', function () {
            it('should return status 200 and show all users', function (done) {
                chai.request(app)
                    .get('/user')
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        done()
                    })
            })
        })
        describe('error response', function () {
            it('should return status 404', function (done) {
                chai.request(app)
                    .get('/users')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        done()
                    })
            })
        })
    })


})