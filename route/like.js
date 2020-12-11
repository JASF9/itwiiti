const express = require("express")
const router = express.Router()

const like_controller = require('../controller/like')

router.post('/like/:id',like_controller.like_create)
router.post('/dislike/:id',like_controller.dislike_create)
router.put('/like:id',like_controller.like_change)
router.put('/dislike/:id',like_controller.dislike_change)
router.get('/like/:id',like_controller.like_get)

module.exports = router;