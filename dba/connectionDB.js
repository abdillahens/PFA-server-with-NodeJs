const mysql = require("mysql");


// const connection = mysql.createConnection({

//     host: "192.248.180.71",
//     user: "test",
//     password: "Y@$123$er",
//     database: "medico",
//     port: "3306"
// })

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"PFA-PROJECT"
})


module.exports = connection;