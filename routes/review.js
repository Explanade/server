const router = require('express').Router()
const ReviewController = require('../controllers/review')
const gcsUpload = require('../middlewares/gcsUpload')
const { authentication, reviewAuthorization } = require('../middlewares/auth')

router.get('/', ReviewController.getAll)
router.get('/:id', ReviewController.getOne)
router.post('/', authentication, gcsUpload.array('images'), ReviewController.create)
router.put('/:id', authentication, reviewAuthorization, gcsUpload.array('images'), ReviewController.update)
router.delete('/:id', authentication, reviewAuthorization, ReviewController.delete)

module.exports = router