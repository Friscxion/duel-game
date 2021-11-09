const express = require('express');
const auth = require("./auth");
const app = express();
const cors = require('cors');
const port = 3003;

app.use(express.json());
app.use(cors());

app.post("/auth", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

app.listen(port, () => {
    console.log(`Micro service connexion http://localhost:${port}`);
})
