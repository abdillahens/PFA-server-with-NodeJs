const connection = require('../dba/connectionDB');
// const clientUser = require('../models/clientUser');
// const adminUser = require('../models/adminUser');
// const specialisteUser = require('../models/specialisteUser');
const mysql = require('mysql');

// const connect = connection.connect((error)=>{
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("connected success");
//     }
//     });


var checkAdmin = async (req,res)=>{

    return new Promise((resolve,reject)=>{

    const {email,password} = req.body;
        let sql = `select * from admin where email= ${mysql.escape(email)} and password = ${mysql.escape(password)}` ;
        connection.query(sql,(error,result,fields)=>{
          if(error){
              console.log("error in query");
              reject(error);
          }
          else{
     
              if(result.length!=0){
              resolve(result);
              }
              else{
                  resolve(null);
              }
          }
         })
         

    })
    
}
// connection.end();

module.exports = checkAdmin;
