const crypto = require("crypto");
module.exports=(req,res,next)=>{
    let {hash,salt,iterations}=req.body;
    crypto.pbkdf2("salt", salt, iterations, 64, "sha512",(err, derivedKey) => {
        if (err) throw err;
        if(hash===derivedKey.toString('hex'))
            next();
        else{
            res.statusCode = 400;
            let e = new Error('Wrong password');
            next(e);
        }
    });
}