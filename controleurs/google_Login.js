
const {OAuth2Client} = require('google-auth-library');
const connection = require('../dba/connectionDB');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var google_Login = (req,res)=>{


    const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
    let token = req.body.token;

    async function verify() {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience:process.env.CLIENT_ID_GOOGLE ,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        console.log(ticket);
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        //check if the jwt is issued for our client
      var audience = payload.aud;
        if (audience !== process.env.CLIENT_ID_GOOGLE) {
            throw new Error(
              'error while authenticating google user: audience mismatch: wanted [' +
              process.env.CLIENT_ID_GOOGLE +
                '] but was [' +
                audience +
                ']'
            );
          }
          return {
         prenom:payload['given_name'] , //profile prenom
         nom:payload['family_name'] ,
          picture: payload['picture'], //profile pic
          id: payload['sub'], //google id
        //   email_verified: payload['email_verified'],
          email: payload['email']
        };
      }
      verify()
      .then((client)=>{
        // console.log(client)
        let sql = `select * from client where idGoogle= ${mysql.escape(client.id)}` ;
        connection.query(sql,(error,result,fields)=>{
             if(error){
                return res.send(error);
           }    

        //    console.log(result)
           if(result.length!=0){
            
            client = JSON.parse(JSON.stringify(result));
            client[0].role = "client";
            client[0].password = '';
            // console.log(client[0]);
            client[0].exist=true;
            const accessToken = jwt.sign(client[0],process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({accessToken:accessToken,user:client[0]});

           }
           else{
             console.log("new account google")
            console.log(client.picture)
            let sql = "insert into client(nom,prenom,email,picture,isConfirmed,idGoogle) values ?";
            let values = [[client.nom, client.prenom, client.email,client.picture,true,client.id]];
            connection.query(sql, [values], (error, result, fields) => {
                if(error){
                    console.log(error)
                    return res.send(error);
               } 
           
            client.role="client" ;
            client.id=result.insertId;
            console.log(client);
            client.exist=false;
            const accessToken = jwt.sign(client,process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({accessToken:accessToken,role:"client",user:client});

           }) 
        }

        })
    

      }).catch((error)=>{return res.send(error)});
    
}

module.exports = google_Login; 