const express = require('express')
const auth = require('../../middlewares/auth')
const roleGuard = require('../../middlewares/roleGurad')
const controllers = require('../../controllers/v1/category')
const {multerStorage} = require('../../utils/multerConfigs')

const upload = multerStorage('public/icons/category',/png|jpg|jpeg|webp|svg|git|svg\+xml/)

const router = express.Router()

router.route('/').post(auth,roleGuard('admin'),upload.single('icon'),controllers.create)



module.exports = router