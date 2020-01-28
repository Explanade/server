const router = require('express').Router()
const ReviewController = require('../controllers/review')
const { authentication, reviewAuthorization } = require('../middlewares/auth')

router.get('/', ReviewController.getAll)
router.get('/:id', ReviewController.getOne)
router.post('/', authentication, ReviewController.create)
router.put('/:id', authentication, reviewAuthorization, ReviewController.update)
router.delete('/:id', authentication, reviewAuthorization, ReviewController.delete)

module.exports = router