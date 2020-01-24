const router = require('express').Router()
const ReviewController = require('../controllers/review')
const gcsUpload = require('../middlewares/gcsUpload')

router.post('/', gcsUpload.array('image'), ReviewController.create)
router.get('/', ReviewController.getAll)
router.get('/:id', ReviewController.getOne)
router.put('/:id', gcsUpload.array('image'), ReviewController.update)
router.delete('/:id', ReviewController.delete)
module.exports = router