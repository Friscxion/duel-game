const jwt = require("jsonwebtoken");
const knex=require("../knex_instance");

module.exports=async (req,res)=> {
    try {
        const { nickname } = req.body;

        if (!(nickname))
            return res.status(400).send("All input is required");

        let user=await knex("users").where("nickname",nickname).first();

        if(!user)
            return res.status(400).send("Invalid Credentials");


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

        if(finalUser)
            return res.status(200).send({token:token});
        else
            return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}