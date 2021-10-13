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

const bcrypt = require( 'bcrypt' );

const salt = bcrypt.genSaltSync(10);

var updateDataClient =  (req,res)=>{

    try{
    
    const {id,nom,prenom,sexe,date_naissance,email,tele,profession,adresse,niveauScolaire,password} = req.body;
    
    console.log("the id is " + id);
    console.log(adresse)
    let sql="";
    if(password){
        const hash = bcrypt.hashSync(password, salt);
         sql = `update User set nom=${mysql.escape(nom)} ,prenom=${mysql.escape(prenom)} ,sexe=${mysql.escape(sexe)},date_naissance=${mysql.escape(date_naissance)} ,numero_tele=${mysql.escape(tele)},profession=${mysql.escape(profession)}   ,email = ${mysql.escape(email)},adresse = ${mysql.escape(adresse)},niveauScolaire=${mysql.escape(niveauScolaire)} ,password=${mysql.escape(hash)} where id=${mysql.escape(id)} ` ;
    }else  sql = `update User set nom=${mysql.escape(nom)} ,prenom=${mysql.escape(prenom)} ,sexe=${mysql.escape(sexe)},date_naissance=${mysql.escape(date_naissance)} ,numero_tele=${mysql.escape(tele)},profession=${mysql.escape(profession)}   ,email = ${mysql.escape(email)},adresse = ${mysql.escape(adresse)},niveauScolaire=${mysql.escape(niveauScolaire)}  where id=${mysql.escape(id)} ` ;
        connection.query(sql,(error,result,fields)=>{
     if(error){
         console.log(error);
         res.status(400).send(error);
     }
     else{
        res.status(200).json(result);
     }
    })
}
catch(e){console.log(e);res.status(400).send(e);}
}


module.exports = updateDataClient;
