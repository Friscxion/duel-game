const bcrypt = require("bcryptjs");

module.exports=(password)=>{
    return bcrypt.hashSync(password, process.env.SALT)
}