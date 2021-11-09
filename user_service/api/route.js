let express = require('express')
let router = express.Router()
require('dotenv').config({ path: './api/.env' });

//Login
router.post('/login', require('./controllers/login'))
//Register
router.post("/register",require('./controllers/register'))

module.exports = router