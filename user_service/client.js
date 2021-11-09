const crypto=require("crypto");

function hashPassword(password) {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    crypto.pbkdf2(password, salt, iterations, 64, "sha512",(err, derivedKey) => {
        if (err) throw err;
        console.log({
            salt: salt,
            hash:derivedKey.toString('hex'),
            iterations: iterations
        });// '3745e48...08d59ae'
    });


}
hashPassword("passw0rd");