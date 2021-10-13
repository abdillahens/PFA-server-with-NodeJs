const bcrypt = require( 'bcrypt' );

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("admin", salt);

console.log(hash);



if( bcrypt.compareSync( 'abdillah', hash ) ) {
    console.log("yeeeep")
 } else {
    // Password didn't match
 }