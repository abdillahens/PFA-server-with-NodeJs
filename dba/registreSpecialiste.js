const { json } = require('express');
const connection = require('./connectionDB');
const jwt = require('jsonwebtoken');
const sendConfirm = require('../email');


// const connect = connection.connect((error)=>{
    
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log("connected success");
//     }
//     });
    
var checkRegistre = function(req,res){

        const {nom,prenom,sexe,date_naissance,email,tele,specialite,password} = req.body;
        console.log(nom,prenom,sexe,date_naissance,email,tele,specialite,password);
   
        let sql =  "insert into specialiste(nom,prenom,sexe,date_naissance,email,numero_tele,specialite,password,isConfirmed) values ?";
        let values = [[nom,prenom,sexe,date_naissance,email,tele,specialite,password,false] ];
        connection.query(sql,[values],(error,result,fields)=>{

        if(error){
             console.log(error);
             return res.status(404).send(error);
        }

        
        const ConfirmToken = jwt.sign({nom, prenom, sexe, date_naissance, email, tele, specialite,role:"specialiste"}, process.env.CONFIRM_TOKEN_SECRET );
        sendConfirm("Gmail" , email , `http://localhost:4200/acceuil/${ConfirmToken}`);
        return res.status(200).json({message:"please verify your email specialiste address to get access to your account",id :result.insertId});
         
    });

}

module.exports = checkRegistre;