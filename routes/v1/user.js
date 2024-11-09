const express = require('express')
const auth = require('../../middlewares/auth')
const roleGuard = require('../../middlewares/roleGurad')
const controller = require('../../controllers/v1/user')

const router = express.Router()


router.route('/ban/:userId').post(auth,roleGuard("admin"),controller.banUser)


module.exports = router