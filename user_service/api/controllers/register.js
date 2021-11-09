const jwt = require("jsonwebtoken");
const realm = require("../../bdd/myrealm");
const bcrypt = require("bcryptjs");

module.exports=async (req,res)=> {
    try {
        // Get user input
        const {nickname, email, password} = req.body;

        // Validate user input
        if (!(email && password && nickname)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        let oldUser=await realm.write(()=>{
            return realm.objects("User").filtered('nickname==$0',nickname)[0];
        });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        let user = await realm.write(()=>{
            let newUser = realm.create("User", {
                _id: Date.now(),
                nickname:nickname,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });
            const token = jwt.sign(
                {user_id: newUser._id, nickname},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            newUser.token = token;
            return newUser;
        })
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}