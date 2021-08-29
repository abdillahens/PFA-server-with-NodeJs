const connection = require('../dba/connectionDB');
const mysql = require('mysql');



var changePWDClient =  (req,res)=>{
    const {id,password} = req.body;
        let sql = `update client set password = ${mysql.escape(password)} where id=${mysql.escape(id)} ` ;
        connection.query(sql,(error,result,fields)=>{
     if(error){
         console.log("error in query");
         res.status(400).send(error);
     }
     else{
        res.status(200).json(result);
     }
    })
}


module.exports = changePWDClient;
