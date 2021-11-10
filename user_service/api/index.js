require('dotenv').config();
const express = require('express')
const app = express()
const port = 3002
const db_init=require("./db_init");
const cors=require("cors");

launch_server=()=>{
    app.use(express.json());
    app.use(cors());

    app.use('/',require("./route"));

    app.get('/', (req, res) => {

    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

db_init().then(launch_server);