const router = require('express').Router()
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')

router.get('/', UserController.findAll)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.get('/myprofile', authentication, UserController.findOne)
router.get('/mybookmark', authentication, UserController.myBookmark)
router.post('/subscribe', UserController.subscribe)
router.delete('/:id', authentication, UserController.remove)


module.exports = router