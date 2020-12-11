const express = require("express")
const router = express.Router()

const comment_controller = require('../controller/comment')

router.post('/comment/:id',comment_controller.comment_create)
router.get('/comment/:id',comment_controller.comment_get)

module.exports = router;