const router = require('express').Router()
const user = require('./user')


router.get('/', (req, res) => res.send(`Hello World - from Explanade <3`))
router.use('/user', user)



module.exports = router