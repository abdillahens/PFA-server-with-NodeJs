const jwt = require('jsonwebtoken');
require('dotenv').config();
const mysql = require('mysql');
const connection = require('../dba/connectionDB');
function authentification(req,res,next){
  
  const authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];
  
  // console.log(token);

  if(token === 'null' ){

    console.log('vous etes pas connecté');
    return res.status(200).send('vous etes pas connecté') ;

  }
  
  else{
   
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) {
      console.log('vous etes hacker');
      return res.status(404).send('hacker')
  };
  let sql = ""
  console.log(user);
  switch(user.role){
    case "client" :  sql = `select * from client where id= ${mysql.escape(user.id)}` ; break;
    case "specialiste" : sql = `select * from specialiste where id= ${mysql.escape(user.id)}` ; break;
    case "admin" : sql = `select * from admin where id= ${mysql.escape(user.id)}` ; break;
  }

  connection.query(sql,(error,result,fields)=>{

if(error){
   console.log("error in query");
   reject(error);
}
// console.log(result);
newUser = JSON.parse(JSON.stringify(result)); // parse the query response from database into string
newUser[0].password = "";
newUser[0].role=user.role;
req.user=newUser[0];
console.log(newUser[0]);
next();
  }
  );
  
  })
  }
}

module.exports = authentification;