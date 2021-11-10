require("dotenv").config();
const config = process.env;
const axios = require("axios");

const refreshToken = (req, res) => {
    axios.post("http://localhost:3002/refresh_token",{
        nickname:this.state.nickname
    }).then(({data})=>{
        res.status(200).send({token:""});
    }).catch((e) => {
        this.setState({state:"failed"})
    });

};

module.exports = refreshToken;