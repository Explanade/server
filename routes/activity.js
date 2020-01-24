const router = require('express').Router()
const ActivityController = require('../controllers/activity')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/', ActivityController.create)
router.get('/', ActivityController.getAllItinerarysActivity)
router.get('/:id', ActivityController.getOneActivity)
router.use(authorization)
router.put('/:id', ActivityController.updateActivity)
router.delete('/:id', ActivityController.deleteActivity)

module.exports = router