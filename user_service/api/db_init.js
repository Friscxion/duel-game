module.exports=async () => {
    const knex = require('./knex_instance');
    try {
        if(!await knex.schema.hasTable("users"))
            await knex.schema.createTable("users", function (table) {
                // id
                table.increments();
                // nickname
                table.string('nickname');
                // password
                table.string('password');
                // email
                table.string('email');
                // token
                table.string('token');
            });
    } catch (e) {
        console.log(e)
    }
}