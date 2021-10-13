const connection = require('../dba/connectionDB');
const mysql = require('mysql');
const bcrypt = require( 'bcrypt' );

const salt = bcrypt.genSaltSync(10);
// const connect = connection.connect((error)=>{
//     if(error){
//         console.log(error)
//     }
//     else{

//         console.log("connected success");
        
//     }
//     });

var updateDataSpecialiste =  (req,res)=>{

    try{

    const {id,nom,prenom,sexe,date_naissance,email,tele,specialite,adresse,password} = req.body;
    let sql="";
    if(password){
        const hash = bcrypt.hashSync(password, salt);
         sql = `update User set nom=${mysql.escape(nom)} ,prenom=${mysql.escape(prenom)} ,sexe=${mysql.escape(sexe)},date_naissance=${mysql.escape(date_naissance)} ,numero_tele=${mysql.escape(tele)},specialite=${mysql.escape(specialite)}   ,email = ${mysql.escape(email)},adresse = ${mysql.escape(adresse)},password=${mysql.escape(hash)} where id=${mysql.escape(id)} ` ;
    }else  sql = `update User set nom=${mysql.escape(nom)} ,prenom=${mysql.escape(prenom)} ,sexe=${mysql.escape(sexe)},date_naissance=${mysql.escape(date_naissance)} ,numero_tele=${mysql.escape(tele)},specialite=${mysql.escape(specialite)}   ,email = ${mysql.escape(email)},adresse = ${mysql.escape(adresse)} where id=${mysql.escape(id)} ` ;
        connection.query(sql,(error,result,fields)=>{
     if(error){
         console.log(error);
         res.status(400).send(error);
     }
     else{
        res.status(200).json({message: "update successfull"});
     }
    })
}catch(e){console.log(e);res.status(400).send(e);}

}


module.exports = updateDataSpecialiste;
