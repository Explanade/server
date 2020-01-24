const router = require('express').Router()
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')

router.get('/', UserController.findAll)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.get('/profile', authentication, UserController.findOne)
router.patch('/update', authentication, UserController.updateProfile)
router.get('/myitinerary', authentication, UserController.myItinerary)
router.post('/subscribe', UserController.subscribe)
router.delete('/:id', authentication, UserController.remove)


module.exports = router