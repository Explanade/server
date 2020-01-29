const User = require('../models/user'),
    { compare } = require('../helpers/bcrypt'),
    { generateToken } = require('../helpers/jwt'),
    // { OAuth2Client } = require('google-auth-library'),
    toUpdate = require('../helpers/updateField'),
    removeGCS = require('../helpers/removeGCS');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLINT_ID);

class UserController {

    static register(req, res, next) {
        let { name, email, password } = req.body
        let profile_picture = ''
        if (req.file) {
            profile_picture = req.file.cloudStoragePublicUrl
        } else {
            profile_picture = `https://ui-avatars.com/api/?name=${name}&rounded=true`
        }
        User.create({ name, email, password, profile_picture })
            .then(createdUser => {
                let payload = {
                    id: createdUser._id,
                    name: createdUser.name,
                    email: createdUser.email,
                    profile_picture: createdUser.profile_picture
                }
                let user = payload
                let token = generateToken(payload)
                res.status(201).json({ token, user })
            })
            .catch(next)
    }

    static updateProfile(req, res, next) {
        let id = req.loggedUser.id
        let dataChanged = toUpdate(["name", "email"], req.body)
        if (req.file) {
            dataChanged.profile_picture = req.file.cloudStoragePublicUrl
            User.findById(id)
                .then(user => {
                    removeGCS(user.profile_picture)
                    return User.updateOne({ _id: id }, dataChanged, { new: true })
                })
                .then(updated => {
                    res.status(200).json({ updated, message: 'success update profile' })
                })
                .catch(next)
        } else {
            User.findOne({ _id: id })
                .select('profile_picture')
                .then(user => {
                    dataChanged.profile_picture = user.profile_picture
                    return User.updateOne({ _id: id }, dataChanged, { new: true })
                })
                .then(updated => {
                    res.status(200).json({ updated, message: 'success update profile' })
                })
                .catch(next)
        }
    }

    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({
            email: email
        })
            .then(foundUser => {
                if (!foundUser) {
                    next({ status: 400, message: 'Invalid password or email' })
                } else {

                    let authPass = compare(password, foundUser.password)
                    if (authPass) {
                        let user = {
                            name: foundUser.name,
                            email: foundUser.email,
                            id: String(foundUser._id),
                            profile_picture: foundUser.profile_picture
                        }
                        const token = generateToken(user)
                        res.status(200).json({ token, user })
                    } else {
                        next({ status: 400, message: 'Invalid password or email' })
                    }
                }
            })
            .catch(next)
    }

    static googleLogin(req, res, next) {
       
        const clientId = process.env.GOOGLE_CLIENT_ID
        let googlePayload = ''
       
        client.verifyIdToken({
            idToken: req.body.token,
            audience: clientId
        })
            .then(ticket => {
                console.log(ticket)
                googlePayload = ticket.getPayload()
                return User.findOne({
                    email: googlePayload.email
                })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        name: googlePayload.name,
                        email: googlePayload.email,
                        password: process.env.PASSWORD_USER,
                        profile_picture: googlePayload.picture
                    })
                }
            })
            .then(newUser => {
                let user = {
                    name: newUser.name,
                    email: newUser.email,
                    id: newUser._id
                },
                    token = generateToken(user)
                res.status(200).json({ token, user })

            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static findAll(req, res, next) {
        User.find()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        let id = req.loggedUser.id
        User.findById(id)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static remove(req, res, next) {
        User.deleteOne({ _id: req.loggedUser.id })
            .then(userdeleted => {
                res.status(200).json(userdeleted)
            })
            .catch(next)
    }
}

module.exports = UserController