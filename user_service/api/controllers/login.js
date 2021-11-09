const jwt = require("jsonwebtoken");
const realm = require("../../bdd/myrealm");
const bcrypt = require("bcryptjs");

module.exports=async (req,res)=> {
    try {
        const { nickname, password } = req.body;

        if (!(nickname && password))
            res.status(400).send("All input is required");

        let user=await realm.write( () => realm.objects("User").filtered('nickname==$0', nickname)[0]);

        if(!user)
            res.status(400).send("Invalid Credentials");

        if(!await bcrypt.compare(password, user.password))
            res.status(400).send("Invalid Credentials");

        user=await realm.write( () => {
            let userFound = realm.objects("User").filtered('nickname==$0', nickname)[0];
            const token = jwt.sign(
                {user_id: userFound._id, nickname},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            userFound.token=token;
            return userFound;
        });

        if(user)
            res.status(200).send(user);
        else
            res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}