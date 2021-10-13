const connection = require('../dba/connectionDB');
// const clientUser = require('../models/clientUser');
// const adminUser = require('../models/adminUser');
// const specialisteUser = require('../models/specialisteUser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

// const connect = connection.connect((error)=>{
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("connected success");
//     }
//     }); 


var checkUser = async (req, res) => {
    try {

        return new Promise((resolve, reject) => {

            const { email, password } = req.body;
            // and password = ${mysql.escape(password)}
            let sql = `select * from User where email= ${mysql.escape(email)}`;
            connection.query(sql, (error, result, fields) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {

                    if (result.length != 0) {
                        resolve(result);
                    }
                    else {
                        resolve(null);
                    }
                }
            })


        })
    }
    catch (e) { reject(e);console.log(e) }

}
// connection.end();

module.exports = checkUser;
