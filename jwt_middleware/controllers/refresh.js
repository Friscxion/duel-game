require("dotenv").config();
const config = process.env;
const axios = require("axios");

const refreshToken = (req, res) => {
    const hostname = new URL(window.location.href).hostname;
    axios.post("http://"+hostname+":3002/refresh_token",{
        nickname:this.state.nickname
    }).then(({data})=>{
        res.status(200).send({token:""});
    }).catch((e) => {
        this.setState({state:"failed"})
    });

};

module.exports = refreshToken;