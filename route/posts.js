const express = require("express")
const router = express.Router()

const posts_controller = require('../controller/posts')

router.post('/post/create',posts_controller.post_create)
router.put('/post/:id',posts_controller.post_update)
router.delete('/post/:id',posts_controller.post_delete)
router.get('/post/all/:nick', posts_controller.post_get_all)
router.get('/post/:id',posts_controller.post_get)

module.exports = router;