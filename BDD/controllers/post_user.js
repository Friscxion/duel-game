const realm=require('../myrealm');
module.exports=(req,res)=>{
    realm.write(()=>{
        let user=realm.objects("User").filtered("nickname==$0",req.body.nickname);
        res.send(user);
    })


}