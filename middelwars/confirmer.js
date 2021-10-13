const jwt = require('jsonwebtoken');
require('dotenv').config();
const connection = require('../dba/connectionDB');
const mysql = require('mysql');

function authentification(req,res,next){
  
  const {token} = req.body;

  console.log(token);
   
  jwt.verify(token,process.env.CONFIRM_TOKEN_SECRET,(err,user)=>{
    const email = user.email.replace(/["']/g, "");
    const role = user.role.replace(/["']/g, "");
    console.log(email);

    
    if(err) {

      console.log('vous etes hacker');
      return res.status(401).send('hacker');

  };
  let sql = "";

  // switch(user.role){
  //   case "specialiste" : sql = `update specialiste set isConfirmed = 1 where email = ? ` ;
  //   case "client" : sql = `update client set isConfirmed = 1 where email = ? ` ;
  // }
  sql = `update User set isConfirmed = 1 where email = ? `
  // let sql = `update specialiste set isConfirmed = 1 where email = ? `
  // // let sql = "update client set isConfirmed = 1 where email = 'abo'"
 
    connection.query(sql,[email],(error, result, fields) => {

        if (error) {
            console.log(error);
            return res.status(402).send(error);
        }
        console.log(result);
    });
  
    user.isConfirmed = true;
    req.user=user;
    console.log(user);
    next();

  })
}

module.exports = authentification;