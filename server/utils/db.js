const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rahul*2000",
    database: "employeems"
});

con.connect(function (err) {
    if (err) {
        console.error('Connection error:', err);
    } else {
        console.log('Connected');
    }
});


module.exports = con;