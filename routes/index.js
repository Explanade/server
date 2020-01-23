const router = require('express').Router()
const user = require('./user')


router.get('/', (req, res) => res.send(`Hello World - from explanade <3`))
router.use('/users', user)


module.exports = router