const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '@Aldyy123',
    database : 'campus'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
})

module.exports = connection;