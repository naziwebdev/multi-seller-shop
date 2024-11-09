const express = require('express')
const controller = require('../../controllers/v1/location')


const router = express.Router()

router.route('/').get(controller.getAll)


module.exports = router