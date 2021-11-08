let express = require('express')
let router = express.Router()

router.post('/connect', require('./controllers/getuser'))
router.post('/connect', require('./controllers/uncypher'))
router.post('/connect', require('./controllers/post_connect'))


module.exports = router