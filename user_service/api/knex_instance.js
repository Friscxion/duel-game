const mdb = require('knex-mariadb');
const knex = require('knex')({
    client: mdb,
    connection: {
        host : 'db',
        port : 3306,
        user : 'tdl_db',
        password : 'password',
        database : 'tdl_db'
    }
});

module.exports=knex;