const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use('/',require("./route"));

app.listen(port, () => {
    console.log(`Micro service BDD http://localhost:${port}`);
})