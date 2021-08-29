const nodemailer = require('nodemailer');

module.exports = function confirmation(service , email,lien){

const transporter = nodemailer.createTransport(

    {
        service : service,
        auth: {
            user: "pfap3312@gmail.com",
            pass: "pfa123456789"
        }
    });

    var mailOptions = {

        from: "pfap3312@gmail.com",
        to: email, 
        subject: 'confirmation', 
        text:`veuillez confirmmer votre compte en cliquant sur ce lien ${lien}`
        
    }

    transporter.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            // console.log(response);
        }

    });
}























// var emailCheck = require('./api-Email');

// // Quick version
// emailCheck('fahime.abdelillh@usms.ac.ma')
//   .then(function (res) {
//     // Returns "true" if the email address exists, "false" if it doesn't.
//     console.log(res)
//   })
//   .catch(function (err) {
//     if (err.message === 'refuse') {
//       // The MX server is refusing requests from your IP address.
//       console.log('server problem')
//     } else {
//       // Decide what to do with other errors.
//       console.log('errors')
//     }
//   });

// With custom options
// emailCheck('mail@example.com', {
//   from: 'address@domain.com',
//   host: 'mail.domain.com',
//   timeout: 3000
// })
//   .then(function (res) {
//     console.log(res);
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

