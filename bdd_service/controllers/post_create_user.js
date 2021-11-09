const realm=require('../myrealm');

module.exports=(req,res)=>{
    realm.write(()=>{
        realm.create("User", {
            _id: Date.now(),
            nickname: req.body.nickname,
            password: req.body.password,
            mail: req.body.mail,
        });
        res.sendStatus(201);
    })
}