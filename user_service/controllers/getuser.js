const axios = require("axios");
module.exports=(req,res,next)=>{
   let {nickname,hash}=req.body;

   axios.post("http://localhost:3001/user",{nickname:nickname})
       .then(({data})=>{
          req.body.hash=hash;
          req.body.password=data.password;
          next();
       })
       .catch(e=>{
          res.statusCode = 400;
          next(e)
       })

}