const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const knex=require("../knex_instance");

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
        let oldUser=await knex("users").where('nickname',nickname).first();

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);



        // Create user in our database
        await knex("users").insert({
            nickname:nickname,
            email: email.toLowerCase(),
            password: encryptedPassword
        });
        let user = await knex("users").where('nickname',nickname).first();

        const token = jwt.sign(
            {user_id: user.id, nickname},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token=token;

        await knex("users").where("id",user.id).update(user);
        let finalUser = await knex("users").where("id",user.id).first();
        res.status(201).json(finalUser);
    } catch (err) {
        console.log(err);
    }
}