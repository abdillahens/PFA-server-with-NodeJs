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

var updateDataClient =  (req,res)=>{

    
    const {id,nom,prenom,sexe,date_naissance,email,tele,profession,adresse,niveauScolaire,password} = req.body;
    
    console.log("the id is " + id);
    console.log(adresse)
    let sql="";
    if(password)
         sql = `update client set nom=${mysql.escape(nom)} ,prenom=${mysql.escape(prenom)} ,sexe=${mysql.escape(sexe)},date_naissance=${mysql.escape(date_naissance)} ,numero_tele=${mysql.escape(tele)},profession=${mysql.escape(profession)}   ,email = ${mysql.escape(email)},adresse = ${mysql.escape(adresse)},niveauScolaire=${mysql.escape(niveauScolaire)} ,password=${mysql.escape(password)} where id=${mysql.escape(id)} ` ;
        else  sql = `update client set nom=${mysql.escape(nom)} ,prenom=${mysql.escape(prenom)} ,sexe=${mysql.escape(sexe)},date_naissance=${mysql.escape(date_naissance)} ,numero_tele=${mysql.escape(tele)},profession=${mysql.escape(profession)}   ,email = ${mysql.escape(email)},adresse = ${mysql.escape(adresse)},niveauScolaire=${mysql.escape(niveauScolaire)}  where id=${mysql.escape(id)} ` ;
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


module.exports = updateDataClient;
