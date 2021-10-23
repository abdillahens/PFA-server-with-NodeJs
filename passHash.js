const bcrypt = require( 'bcrypt' );

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("admin1234", salt);

// console.log(hash);



// if( bcrypt.compareSync( 'admin', hash ) ) {
//     console.log("yeeeep")
//  } else {
//     // Password didn't match
//  }

const { json } = require('express');
const connection = require('./dba/connectionDB');

const jwt = require('jsonwebtoken');


let sql = "insert into User(email,password,isConfirmed,role) values ?";
    let values = [["admin@gmail.com",hash,true,'admin']];
    connection.query(sql, [values], (error, result, fields) => {

      if (error) {
         console.log(error);
         // return res.status(402).send(error);
     }
     console.log("success")

    })
