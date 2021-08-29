const connection = require('../dba/connectionDB');
const mysql = require('mysql');

// const connect = connection.connect((error)=>{
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("connected success");
//     }
//     });

var deleteDataClient =  (req,res)=>{

  const {id}=req.body;
        let sql = `delete  from client where id=${mysql.escape(id)}` ;
        connection.query(sql,(error,result,fields)=>{
            
     if(error){
         console.log("error in query");
         return res.status(400).send(error);
     }
     else{
         return res.status(200).json(result);
    }
})
    }

module.exports = deleteDataClient;
