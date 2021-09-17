const express = require("express");
const cors = require("cors");
const app = express();
const connection = require('./dba/connectionDB');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const api_login = require("./routes/api_login");
const api_registre = require("./routes/api_registre");
const fileSaveApi = require('./routes/fileSave')
const selectDataClient = require ("./controleurs/selectDataClient");
const selectDataSpecialiste = require ("./controleurs/selectDataSpecialiste");
const deleteDataClient = require("./controleurs/deleteDataClient");
const updateDataClient = require("./controleurs/updateDataClient");
const deleteDataSpecialiste = require("./controleurs/deleteDataSpecialiste");
const updateDataSpecialiste = require("./controleurs/updateDataSpecialiste");
const changePwdClient = require("./controleurs/changePasswordClient");
const google_Login = require("./controleurs/google_Login");
require('dotenv').config();
const auth = require('./middelwars/authentification');
const confirmer = require('./middelwars/confirmer');
app.use(express.json()); // enable json to receive json data from frontend ;
app.use(express.urlencoded({extended:false})); // enable http request
app.use(cors()); 
const connect = connection.connect((error) => {

    if (error) {
        console.log(error);
    }
    else {
        console.log("connected success");
    }
});

app.get('/download', function(req, res){
    const file = `${__dirname}/uploads/deplomes/aneexees.pdf`;
    res.download(file); // Set disposition and send it.
  });
app.get('/select',selectDataClient); // select all client in our systeme to do some update or deleting clients ..
app.get('/select/specialiste',selectDataSpecialiste); 
app.post('/delete/client',deleteDataClient); // delete client identified by his id
app.post('/update/client',updateDataClient); // update client with new infos passing in the body,identified by id
app.post('/delete/specialiste',deleteDataSpecialiste); // delete client identified by his id
app.post('/update/specialiste',updateDataSpecialiste); 
app.post('/reset-Password/client',changePwdClient); // change client's password identified by his id

app.get('/',auth,(req,res)=>{ 
    // console.log(req.user)// authorization user (same role of sessions) , return user infos (username ,...)
    res.status(200).json(req.user);
});

app.use('/uploadFileClient',express.static('uploads/img/client'));
app.use('/uploadFileSpecialiste',express.static('uploads/img/specialiste'));
app.post('/login-google',google_Login);

app.post('/confirm',confirmer,(req,res)=>{ 
    // authorization user (same role of sessions) , return user infos (username ,...)
    const accessToken = jwt.sign(req.user, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json({ accessToken: accessToken ,role : req.user.role});
    // res.status(200).json(req.user);
});

app.use('/upload', fileSaveApi);
app.use('/login',api_login);

app.use('/registre',api_registre);


app.listen(5000,()=>{
    console.log("running......");
})

;
