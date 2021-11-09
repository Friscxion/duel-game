let express = require('express')
let router = express.Router()


router.post('/user', require('./controllers/post_user'))
router.post('/new_user', require('./controllers/post_create_user'))

module.exports = router