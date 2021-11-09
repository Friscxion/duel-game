const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

app.use('/',require("./route"));

app.listen(port, () => {
    console.log(`Micro service connexion http://localhost:${port}`);
})