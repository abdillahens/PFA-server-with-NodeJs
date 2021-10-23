const { json } = require('express');
const connection = require('./connectionDB');

const jwt = require('jsonwebtoken');
var emailCheck = require('../api-Email');
const sendConfirm = require('../email');
const bcrypt = require( 'bcrypt' );

const salt = bcrypt.genSaltSync(10);


// const connect = connection.connect((error) => {

//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log("connected success");
//     }
// });


var checkRegistre = async function (req, res) {
    

    const { nom, prenom, sexe, date_naissance, email, tele,adresse, profession, niveauScolaire,password } = req.body;
    console.log(nom, prenom, sexe, date_naissance, email, tele, profession, password,niveauScolaire,false);

//     var a = await emailCheck(email);
//    console.log(a.valid);

    // if(!emailCheck(email).valid){
    //     return res.status(404).send({
    //         message: "Please provide a valid email address."
    //       });
    // }
    const hash = bcrypt.hashSync(password, salt);
    let sql = "insert into User(nom,prenom,sexe,date_naissance,email,numero_tele,adresse,profession,niveauScolaire,password,isConfirmed,role) values ?";
    let values = [[nom, prenom, sexe, date_naissance, email, tele,adresse, profession,niveauScolaire, hash,false,'client']];
    connection.query(sql, [values], (error, result, fields) => {

        if (error) {
            console.log(error);
            return res.status(402).send(error);
        }

        let id = result.insertId;
        console.log('the id of this user is '+email)
        // let password='';
        const ConfirmToken = jwt.sign({id,nom, prenom, sexe, date_naissance, email, tele,adresse, profession,niveauScolaire,role:"client"}, process.env.CONFIRM_TOKEN_SECRET );
        sendConfirm("Gmail" , email , `http://medicocall.com/acceuil/${ConfirmToken}`);
        return res.status(200).json({message:"Veulliez verifier votre email adresse pour acceder à votre compte"});

    });

}

module.exports = checkRegistre;