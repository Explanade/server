const router = require('express').Router()
const ReviewController = require('../controllers/review')
const gcsUpload = require('../middlewares/gcsUpload')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', gcsUpload.array('image'), ReviewController.create)
router.get('/', ReviewController.getAll)
router.get('/:id', ReviewController.getOne)
router.use(authorization)
router.put('/:id', gcsUpload.array('image'), ReviewController.update)
router.delete('/:id', ReviewController.delete)
module.exports = router