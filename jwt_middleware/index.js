const express = require('express');
const auth = require("./controllers/auth");
const refresh =require("./controllers/refresh")
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.json());
app.use(cors());

app.post("/auth", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});
app.post("/refresh", refresh);

app.listen(port, () => {
    console.log(`Micro service middleware http://localhost:${port}`);
})
