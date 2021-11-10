let express = require('express')
let router = express.Router()


//Login
router.post('/login', require('./controllers/login'))
//Register
router.post("/register",require('./controllers/register'))
//Refresh Token
router.post("/refresh_token",require('./controllers/refresh_token'))

module.exports = router