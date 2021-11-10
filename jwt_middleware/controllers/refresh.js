require("dotenv").config();
const config = process.env;

const refreshToken = (req, res) => {
    res.status(200).send({token:""});
};

module.exports = refreshToken;