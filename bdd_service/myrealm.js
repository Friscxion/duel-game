let User = require("./schema/User");
const Realm=require("realm");
const realm = new Realm({
    schema: [User]
});

module.exports=realm;
