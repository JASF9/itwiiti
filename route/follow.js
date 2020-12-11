const express = require("express")
const router = express.Router()

const follow_controller = require('../controller/follow')

router.post('/follow/:nick',follow_controller.follow_create)
router.delete('/follow/:nick',follow_controller.follow_delete)
router.get('/follow:nick',follow_controller.follow_get)

module.exports = router;