const router = require('express').Router()
const ActivityController = require('../controllers/activity')
const { authentication, activityAuthorization } = require('../middlewares/auth')

router.get('/', ActivityController.getAll)
router.get('/:id', ActivityController.getOneActivity)
router.post('/', authentication, ActivityController.create)
router.patch('/:id', ActivityController.updateActivity)
router.delete('/:id', authentication, activityAuthorization, ActivityController.deleteActivity)

module.exports = router