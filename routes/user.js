const router = require('express').Router()
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')
const { multer, sendUploadToGCS } = require('../middlewares/uploader')


router.get('/', UserController.findAll)
router.post('/register', multer.single('profile_picture'), sendUploadToGCS, UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)
router.get('/profile', authentication, UserController.findOne)
router.patch('/update', authentication, multer.single('profile_picture'), sendUploadToGCS, UserController.updateProfile)
router.delete('/', authentication, UserController.remove)

module.exports = router