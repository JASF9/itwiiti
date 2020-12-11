const express = require("express")
const router = express.Router()

const user_controller = require('../controller/user')

router.post('/user/create',user_controller.user_create)
router.put('/user/:nick',user_controller.user_update)
router.delete('/user/:nick',user_controller.user_delete)
router.get('/user/search/:text', user_controller.user_search)
router.get('/user/:nick',user_controller.user_get_other)
router.get('/user/all',user_controller.user_get_all)
router.put('/user/photo/:nick',user_controller.set_photo)
router.get('/user',user_controller.user_get)

module.exports = router;