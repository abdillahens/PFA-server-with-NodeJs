const connection = require('../dba/connectionDB');
const mysql = require('mysql');

// const connect = connection.connect((error)=>{
//     if(error){
//        console.log(error)
//     }
//     else{
//         console.log("connected success");
//     }
//     });

var selectDataClient =  (req,res)=>{
 
        let sql = `select * from client` ;
        connection.query(sql,(error,result,fields)=>{
            
     if(error){
         console.log(error);
        return  res.status(400).send(error);
     }
     else{
        //  console.log(result);
        return res.status(200).json(result);
     }
    })    
}


module.exports = selectDataClient;


