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

    try{

        const {nom,prenom,sexe,date_naissance,email,tele,specialite,password} = req.body;
        console.log(nom,prenom,sexe,date_naissance,email,tele,specialite,password);
   
        let sql =  "insert into User(nom,prenom,sexe,date_naissance,email,numero_tele,specialite,password,isConfirmed,role) values ?";
        let values = [[nom,prenom,sexe,date_naissance,email,tele,specialite,password,false,'specialiste'] ];
        connection.query(sql,[values],(error,result,fields)=>{

        if(error){
             console.log(error);
             return res.status(404).send(error);
        }
        let id = result.insertId;
        const ConfirmToken = jwt.sign({id,nom, prenom, sexe, date_naissance, email, tele, specialite,role:"specialiste"}, process.env.CONFIRM_TOKEN_SECRET );
        sendConfirm("Gmail" , email , `http://80.240.28.95/acceuil/${ConfirmToken}`);
        return res.status(200).json({message:"Veulliez verifier votre email adresse pour acceder à votre compte",id :result.insertId});
         
    });

}catch(e){console.log(e);return res.status(404).send(error);}

}

module.exports = checkRegistre;