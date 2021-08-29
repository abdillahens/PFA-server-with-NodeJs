const emailValidator = require('deep-email-validator');
 
module.exports= async function isEmailValid(email) {
let r =await emailValidator.validate(email)
// console.log(r);
} 

