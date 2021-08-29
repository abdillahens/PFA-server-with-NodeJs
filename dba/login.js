const connection = require('./connectionDB');
const clientUser = require('../models/clientUser');
const adminUser = require('../models/adminUser');
const specialisteUser = require('../models/specialisteUser');
const mysql = require('mysql');
const checkClient = require('../controleurs/checkClient');
const checkAdmin = require('../controleurs/checkAdmin');
const checkSpecialiste = require('../controleurs/checkSpecialiste');
const jwt = require('jsonwebtoken');
require('dotenv').config();

var checkLogin = async function(req,res){

    console.log("login works")

    ////  check  admin table data first bacause it is the small one

   try{

   var adm =await checkAdmin(req,res);
    adm = JSON.parse(JSON.stringify(adm)); // parse the query response from database into string
 
   if(adm !=null){
 
    console.log(adm)
       adm[0].password = "";
       adm[0].role='admin';
        const accessToken = jwt.sign(adm[0],process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({accessToken:accessToken,role : "admin"});
   }

   else{  
       
       try{ 
        ////  check  aspecialiste table data second bacause it is the small one after admin
        var specialiste = await checkSpecialiste(req,res);
        specialiste = JSON.parse(JSON.stringify(specialiste)); // parse the query response from database into string
        console.log(specialiste);

        if(specialiste !=null && specialiste[0].isConfirmed){
            specialiste[0].password = "";
            specialiste[0].role='specialiste';
            const accessToken = jwt.sign(specialiste[0],process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({accessToken:accessToken,role : "specialiste"});
        }
        else{  
             /// ///
             try{  ////  check  client table data second bacause it is the biggest one
             var client = await checkClient(req,res);
             client = JSON.parse(JSON.stringify(client)); // parse the query response from database into string
             console.log(client);
             console.log("client works");
             console.log(client[0].isConfirmed);
             if(client !=null  && client[0].isConfirmed){
                client[0].role = 'client';
                client[0].password = '';
                const accessToken = jwt.sign(client[0],process.env.ACCESS_TOKEN_SECRET);
                res.status(200).json({accessToken:accessToken,role : "client"});
             }
             else{
                res.status(404).json({message:"l'email ou le mot de pass est incorrect"});
             }
            }
            catch(error){
                 res.status(404).send(error);
            }
        }
    }catch(error){
        res.status(404).send(error);
    }  
   }
}

catch(error){

    res.status(404).send(error);

}
res.end();
    
}

module.exports = checkLogin;