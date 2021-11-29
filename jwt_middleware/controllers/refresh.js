require("dotenv").config();
const config = process.env;
const axios = require("axios");

const refreshToken = (req, res) => {

    axios.post("http://host.docker.internal:3002/refresh_token",{
        nickname:req.user.nickname
    }).then(({data})=>{
        res.status(200).send({token:data});
    }).catch((e) => {
       console.log(e)
    });

};

module.exports = refreshToken;