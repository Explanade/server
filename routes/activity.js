const router = require('express').Router()
const ActivityController = require('../controllers/activity')

router.post('/', ActivityController.create)
router.get('/', ActivityController.getAllItinerarysActivity)
router.get('/:id', ActivityController.getOneActivity)
router.put('/:id', ActivityController.updateActivity)
router.delete('/:id', ActivityController.deleteActivity)

module.exports = router