const connection = require('../dba/connectionDB');
const mysql = require('mysql');

// const connect = connection.connect((error)=>{
//     if(error){
//        console.log(error)
//     }
//     else{
//         console.log("connected success");
//     }
//     });

var selectDataSpecialiste = (req, res) => {

    try {
        console.log("request send")
        let sql = `select * from User where role='specialiste' `;
        connection.query(sql, (error, result, fields) => {

            if (error) {
                console.log(error);
                return res.status(400).send(error);
            }
            else {
                console.log(result);
                return res.status(200).json(result);
            }
        })

    }
    catch (e) { console.log(e); return res.status(400).send(e); }
}
module.exports = selectDataSpecialiste;


