const express = require("express")
const router = express.Router()

const auth_controller = require('../controller/auth')

router.post('/login',auth_controller.login)

module.exports = router;