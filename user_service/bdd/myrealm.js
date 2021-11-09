let User = require("./schema/User");
const Realm=require("realm");
const realm = new Realm({
    schema: [User],
    path:"./bdd/bdd.realm",
    schemaVersion:3
});

module.exports=realm;
